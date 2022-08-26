import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {UserApiService} from "../../services/userApi.service";
import {PusherService} from "../../services/pusher.service";
import {SystemService} from "../../services/system.service";

declare const $: any;

@Component({
    templateUrl: './confirmauth.page.html',
    styleUrls: ['./confirmauth.page.scss']
})
export class ConfirmauthPage implements OnInit, AfterViewInit {
    allowed_g2f = 0;

    email = '';
    password = '';
    confirm_code = '';

    constructor(
        public router: Router,
        public settings: SettingsService,
        public notify: NotifyService,
        public userApi: UserApiService,
        public pusher: PusherService,
        public system: SystemService
    ) {
    }

    ngOnInit() {
        if (this.settings.getUserSetting('allowed_g2f') === undefined || this.settings.getUserSetting('allowed_g2f') == 0) {
            this.router.navigate(['/']);
        }

        if (this.settings.getUserSetting('email') === undefined || this.settings.getUserSetting('email') == '') {
            this.router.navigate(['/']);
        }

        this.allowed_g2f = this.settings.getUserSetting('allowed_g2f');
        this.email = this.settings.getUserSetting('email');
        this.password = this.settings.getUserSetting('password');
    }

    ngAfterViewInit() {
    }

    onSubmitCode() {
        this.settings.loading = true;
        this.userApi.confirmCodeAndLogin({
            code: this.confirm_code,
            email: this.email,
            password: this.password
        }).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.settings.setUserSetting('password', '');

                this.settings.setUserSetting('user_id', res.user_id);
                this.settings.setUserSetting('account_verified', res.account_verified);
                this.settings.setUserSetting('name', res.name);
                this.settings.setUserSetting('balance', res.balance);
                this.settings.setUserSetting('phone_number', res.phone_number);
                this.settings.setUserSetting('ref_code', res.ref_code);

                this.settings.setAppSetting('is_loggedin', true);
                this.settings.setStorage('token', res.token);

                this.system.init();
                this.router.navigate(['/market']);

                this.pusher.connect();
            } else {
                this.notify.showWarning(res.error);
            }
        }, err=> {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }
}
