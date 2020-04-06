import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    username: '',
    groups: []
  };
  private graphClient: Client;

  constructor(private authService: MsalService) { }

  getUser() {
    if(!this.user.username) {
      // Initialize Microsoft Graph client
      this.graphClient = Client.init({
        authProvider: async (done) => {
          let token = await this.authService.acquireTokenSilent(["Group.Read.All"])
            .catch((reason) => {
              done(reason, null);
            });
  
          if (token) {
            done(null, token);
          } else {
            done("Could not get an access token", null);
          }
        }
      });
      //Get associated member roles
      this.graphClient.api('/me/memberOf').get()
        .then((response) => {
          this.user.groups = response.value.map(member => member.displayName);
          this.user.username = this.authService.getUser().name;
          console.log(this.user);
        }, (error) => {
          console.log('getMemberRoles() - error');
        });
    }
      return this.user;
  }
}
