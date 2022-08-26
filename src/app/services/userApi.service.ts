/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class UserApiService extends ApiService {
    login(data): any {
        return this.post('/login', data);
    }

    register(data): any {
        return this.post('/register', data);
    }

    confirmPassword(data): any {
        return this.post('/confirm_password', data);
    }

    resetPassword(data) {
        return this.post('/reset_password', data);
    }

    sendForgotEmail(data) {
        return this.post('/account/sendForgotEmail', data);
    }

    sendActivateEmail(data) {
        return this.post('/account/sendActivateEmail', data);
    }

    confirmResetCode(data) {
        return this.post('/confirm_resetcode', data);
    }

    getUserByRefCode(data) {
        return this.get('/refcode/user', data);
    }

    generateUserG2FSecurityCode(data) {
        return this.get('/user/g2fcode/generate', data);
    }

    sendUserSMSCode(data) {
        return this.post('/user/send/sms', data);
    }

    sendUserEmailCode(data) {
        return this.post('/user/send/email', data);
    }

    confirmCodeAndSetAuth(data) {
        return this.post('/user/set/auth', data);
    }

    confirmCodeAndLogin(data) {
        return this.post('/user/confirm/2fcode', data);
    }
}

