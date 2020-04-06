import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map, debounceTime, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StringResponse } from '../../../shared/models/string-response';
import { CoreModule } from '../../core.module';

@Injectable({
    providedIn: 'root'
})
export class TestserviceService {

    private _testApi = '/api/test';  // URL to web api
    public _baseHRef = 'https://wfapps2-dev.amgreetings.com:8443/angular-spring-template';
    private _reqOptionsArgs = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    constructor(private http: HttpClient, private pl: PlatformLocation) {
    }

    testJavaApi(): Observable<StringResponse> {
        let url = this._baseHRef + this._testApi;
        console.log(url);
        return this.http.get<StringResponse>(url, this._reqOptionsArgs);
    }
}
