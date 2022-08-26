/**
 * Created by ApolloYr on 11/17/2017.
 */
import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {SettingsService} from './settings.service';
import {BalanceService} from "./balance.service";
import {PusherService} from "./pusher.service";
import {SystemService} from "./system.service";
import {AccountApiService} from "./accountApi.service";

@Injectable()
export class AuthguardService implements Resolve<any> {

    constructor(private router: Router,
                private settings: SettingsService,
                private balance: BalanceService,
                private pusher: PusherService,
                private system: SystemService,
                private accountApi: AccountApiService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.settings.getAppSetting('is_loggedin')) {
                this.canAccess(state.url, this.settings.getUserSetting('role')) ? resolve(true) : reject('no privillege');
            } else if (this.settings.getStorage('token')) {
                this.accountApi.getAccountInfo().subscribe((res:any) => {
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
                        resolve(false);
                    }
                }, err => {
                    reject('information is invalid');
                    this.settings.setStorage('token', false);
                    this.router.navigate(['/login']);
                });
            } else {
                reject('not logged in');
                this.router.navigate(['/login']);
            }
        });
    }

    private canAccess(url, role) {
        return true;
    }
}

