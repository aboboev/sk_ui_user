/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {TranslatorService} from "./translator.service";
import {SettingsService} from "./settings.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class ApiService {
    constructor(private http: HttpClient,
                public settings: SettingsService,
                public translator: TranslatorService
    ) {
    }

    createAuthorizationHeader() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + this.settings.getStorage('token'));
    }

    get(url, data?) {
        let headers = this.createAuthorizationHeader();

        data.locale = this.translator.getCurrentLangCode();
        return this.http.get(this.settings.apiUrl + url, {
            headers: headers,
            params: data
        }).pipe(
            catchError(error => this.handleError(this, error))
        );
    }

    post(url, data) {
        let headers = this.createAuthorizationHeader();

        data.locale = this.translator.getCurrentLangCode();
        return this.http.post(this.settings.apiUrl + url, data, {
            headers
        }).pipe(
            catchError(error => this.handleError(this, error))
        );
    }

    put(url, data) {
        let headers = this.createAuthorizationHeader();

        data.locale = this.translator.getCurrentLangCode();
        return this.http.put(this.settings.apiUrl + url, data, {
            headers: headers
        }).pipe(
            catchError(error => this.handleError(this, error))
        );
    }

    handleError(_parnet: any, error: any) {
        if ((error.status == 401 || error.status == 400) && error.url && !error.url.endsWith('/login')) {
            console.log('unauthorized');
            if (_parnet.settings) this.settings.setStorage('token', false);
            if (_parnet.settings) this.settings.setAppSetting('is_loggedin', false);
            _parnet.router.navigate(['/']);
        }
        // In a real world app, you might use a remote logging infrastructure
        return throwError(error.statusText);
    }

    uploadFile(file) {
        let headers = this.createAuthorizationHeader();

        var formData = new FormData();

        formData.append("file", file, file.name);

        return this.http.post(this.settings.apiUrl + '/upload/file', formData, {
            headers: headers
        }).pipe(
            catchError(error => this.handleError(this, error))
        );
    }

    // Currency Rate
    getCurrencyRate() {
        return this.get('/currency_rate', {});
    }

    getSystemSettings(data) {
        return this.get('/settings/all', data);
    }

    // Bank
    getBanks(data) {
        return this.get('/bank', data);
    }
}

