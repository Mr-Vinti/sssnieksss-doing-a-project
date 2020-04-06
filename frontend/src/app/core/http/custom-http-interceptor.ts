import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import 'rxjs/add/observable/fromPromise';
import { MSALError } from '../../shared/models/MSALError';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private auth: MsalService, private broadcastService: BroadcastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var _this = this;
    var scopes = this.auth.getScopesForEndpoint(window.location.origin + environment.baseHref);
    console.log('Url: ' + window.location.origin + environment.baseHref + ' maps to scopes: ' + scopes);
    if (scopes === null) {
      return next.handle(req);
    }
    var tokenStored = this.auth.getCachedTokenInternal(scopes);
    if (tokenStored && tokenStored.token) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + tokenStored.token,
        }
      });
      return next.handle(req).do(function (event) { }, function (err) {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          var scopes = _this.auth.getScopesForEndpoint(window.location.origin + environment.baseHref);
          var tokenStored = _this.auth.getCachedTokenInternal(scopes);
          if (tokenStored && tokenStored.token) {
            _this.auth.clearCacheForScope(tokenStored.token);
          }
          var msalError = new MSALError(JSON.stringify(err), "", JSON.stringify(scopes));
          _this.broadcastService.broadcast('msal:notAuthorized', msalError);
        }
      });
    }
    else {
      return Observable.fromPromise(this.auth.acquireTokenSilent(scopes).then(function (token) {
        var JWT = "Bearer " + token;
        return req.clone({
          setHeaders: {
            Authorization: JWT,
          },
        });
      })).mergeMap(function (req) {
        return next.handle(req).do(function (event) { }, function (err) {
          if (err instanceof HttpErrorResponse && err.status == 401) {
            var scopes = _this.auth.getScopesForEndpoint(window.location.origin + environment.baseHref);
            var tokenStored = _this.auth.getCachedTokenInternal(scopes);
            if (tokenStored && tokenStored.token) {
              _this.auth.clearCacheForScope(tokenStored.token);
            }
            var msalError = new MSALError(JSON.stringify(err), "", JSON.stringify(scopes));
            _this.broadcastService.broadcast('msal:notAuthorized', msalError);
          }
        });
      }); //calling next.handle means we are passing control to next interceptor in chain
    }
  }
}