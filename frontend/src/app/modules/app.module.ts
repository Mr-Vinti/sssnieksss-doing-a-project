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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';


//Microsoft
import { MsalModule } from "@azure/msal-angular";
import { LogLevel } from 'msal';

//external angular components,modules,directives
import { ModuleOneModule } from '../modules/module-one/module-one.module';
import { AppComponent } from './app.component';

//core Module
import { CoreModule } from '../core/core.module';

//shared Module
import { SharedModule } from '../shared/shared.module';

//routes
import { AppRoutingModule } from './app-routing.module';
import { CustomHttpInterceptor } from '../core/http/custom-http-interceptor';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}
export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']],
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,	
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ModuleOneModule,
    MsalModule.forRoot({
      clientID: 'TODO',
      authority: "https://login.microsoftonline.com/TODO/",
      validateAuthority: true,
      redirectUri: window.location.origin + environment.baseHref,
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: window.location.origin + environment.baseHref,
      navigateToLoginRequestUrl: false,
      popUp: false,
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: "1000",
      level: LogLevel.Info,
      piiLoggingEnabled: true
  })],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}
  ]
})
export class AppModule { }