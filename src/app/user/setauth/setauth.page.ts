import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {UserApiService} from "../../services/userApi.service";

declare const $: any;

@Component({
    templateUrl: './setauth.page.html',
    styleUrls: ['./setauth.page.scss']
})
export class SetauthPage implements OnInit, AfterViewInit {
    allowed_g2f = 0;
    step = 0;

    email = '';
    google_secret_code = '';
    phone_number = '';

    confirm_code = '';

    timerID: any;
    constructor(
        public router: Router,
        public settings: SettingsService,
        public notify: NotifyService,
        public userApi: UserApiService
    ) {
    }

    ngOnInit() {
        if (this.settings.getUserSetting('allowed_g2f') === undefined || this.settings.getUserSetting('allowed_g2f') != 0) {
            this.router.navigate(['/']);
        }

        if (this.settings.getUserSetting('email') === undefined || this.settings.getUserSetting('email') == '') {
            this.router.navigate(['/']);
        }
        this.email = this.settings.getUserSetting('email');
    }

    ngAfterViewInit() {
    }

    setIntlTelInput() {
        $("#phone").intlTelInput({
            placeholderNumberType: "MOBILE",
            preferredCountries: ['tr'],
            separateDialCode: true,
            utilsScript: 'assets/js/utils.js'
        });

        $('.intl-tel-input').width('100%');
        clearInterval(this.timerID);
    }

    onNext() {
        if (this.allowed_g2f == 0) {
            this.notify.showWarning('Please select mode');
            return;
        } else if (this.allowed_g2f == 1) {
            this.settings.loading = true;
            this.userApi.generateUserG2FSecurityCode({
                email: this.email
            }).subscribe((res:any) => {
                this.settings.loading = false;
                if (res.success) {
                    this.google_secret_code = res.code;

                    this.confirm_code = '';
                    this.step = 1;
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.settings.loading = false;
            });
        } else if (this.allowed_g2f == 2) {
            // let _parent = this;
            // this.timerID = setInterval(function () {
            //     if ($('#phone').length > 0 && typeof $("#phone").intlTelInput("getNumber") !== 'string') {
            //         _parent.setIntlTelInput();
            //     }
            // }, 200);
            this.settings.loading = true;
            this.userApi.sendUserSMSCode({
                email: this.email,
            }).subscribe((res:any) => {
                this.settings.loading = false;

                if (res.success) {
                    this.notify.showSuccess('Please check SMS code on your registered phone.');

                    this.confirm_code = '';
                    this.step = 1;
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.settings.loading = false;
            });
        } else if (this.allowed_g2f == 3) {
            this.settings.loading = true;
            this.userApi.sendUserEmailCode({
                email: this.email,
            }).subscribe((res:any) => {
                this.settings.loading = false;
                if (res.success) {
                    this.notify.showSuccess('Please check confirm code on your registered email.');

                    this.confirm_code = '';
                    this.step = 1;
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.settings.loading = false;
            });
        }
    }

    onSendSMS() {
        // this.settings.loading = true;
        // this.userApi.sendUserSMSCode({
        //     email: this.email,
        // }).subscribe((res:any) => {
        //     this.settings.loading = false;
        //
        //     if (res.success) {
        //         this.notify.showSuccess('Please check SMS code on your phone.');
        //     } else {
        //         this.notify.showWarning('Your phone number is wrong.');
        //     }
        // }, err => {
        //     this.settings.loading = false;
        // });
    }

    ngOnDestroy() {
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    onSubmitCode() {
        this.settings.loading = true;
        this.userApi.confirmCodeAndSetAuth({
            code: this.confirm_code,
            email: this.email,
            allowed_g2f: this.allowed_g2f
        }).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showSuccess('You have set Authentication mode successfully.');

                this.router.navigate(['/login']);
            } else {
                this.notify.showWarning(res.error);
            }
        }, err=> {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }
}
