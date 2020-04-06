/**
 *    Copyright 2016 Sven Loesekann
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular'
import { Subscriber, Subscription } from 'rxjs';
import { UserService } from '../core/user.service';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Template app!';
  isIframe: boolean;
  private subscription: Subscription;
  loggedIn: boolean;
  user: User;

  navLinks = [
    {
      path: 'admin',
      label: 'Admin',
      group: 'Admin',
    },
    {
      path: 'secretary',
      label: 'Secretary',
      group: 'Secretary'
    },
    {
      path: 'student',
      label: 'Student',
      group: 'Student'
    },
  ]

  constructor(private broadcastService: BroadcastService,
    private authService: MsalService,
    private userService: UserService) {
    this.isIframe = window !== window.parent && !window.opener;
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe("msal:loginSuccess",
      (payload) => {
        console.log("login success " + JSON.stringify(payload));
      });
    this.user = this.userService.getUser();
  }

  ngOnDestroy() {
    // disconnect from broadcast service on component destroy
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}