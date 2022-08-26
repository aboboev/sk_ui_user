/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class AccountApiService extends ApiService {
    getAccountInfo() {
        return this.get('/account', {});
    }

    getAccountBalance() {
        return this.get('/account/balance', {});
    }

    sendAuthCode() {
        return this.post('/security/send/auth/code', {});
    }

    changePassword(data) {
        return this.post('/change_password', data);
    }

    getAccountBankInfo(data) {
        return this.get('/account/bank', data);
    }

    saveAccountBankInfo(data) {
        return this.post('/account/bank', data);
    }
    // profile
    getProfile(data) {
        return this.get('/profile', data);
    }

    getVerifyData(data) {
        return this.get('/verifydata', data);
    }

    setVerifyData(data) {
        return this.post('/verifydata', data);
    }

    getLoginHistory(data) {
        return this.get('/login_history', data);
    }

    logout(data): any {
        return this.post('/account/logout', data);
    }
}

