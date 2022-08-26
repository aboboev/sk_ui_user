/**
 * Created by ApolloYr on 11/17/2017.
 */
import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {SettingsService} from './settings.service';
import {PusherService} from "./pusher.service";
import {SystemService} from "./system.service";
import {AccountApiService} from "./accountApi.service";

@Injectable()
export class AuthcheckService implements Resolve<any> {

    constructor(private router: Router,
                private settings: SettingsService,
                private api: AccountApiService,
                private pusherService: PusherService,
                private system: SystemService,
                private pusher: PusherService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.settings.getUserSetting('email')) {
                resolve(true);
            } else if (this.settings.getStorage('token')) {
                this.api.getAccountInfo().subscribe((res:any) => {
                    if (res.success) {
                        this.settings.setAppSetting('is_loggedin', true);

                        this.settings.setUserSetting('user_id', res.user_id);
                        this.settings.setUserSetting('email', res.email);
                        this.settings.setUserSetting('account_verified', res.account_verified);
                        this.settings.setUserSetting('name', res.name);
                        this.settings.setUserSetting('balance', res.balance);
                        this.settings.setUserSetting('phone_number', res.phone_number);
                        this.settings.setUserSetting('ref_code', res.ref_code);

                        this.settings.setAppSetting('is_loggedin', true);

                        this.system.init();

                        this.pusher.connect();

                        resolve(true);
                    } else {
                        resolve(true);
                    }
                }, err => {
                    this.settings.setStorage('token', false);
                    resolve(true);
                });
            } else {
                resolve(true);
            }
        });
    }
}

