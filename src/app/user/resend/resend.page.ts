import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {UserApiService} from "../../services/userApi.service";
import {NotifyService} from "../../services/notify.service";
import {SettingsService} from "../../services/settings.service";

declare const $: any;

@Component({
    selector: 'app-forgot-page',
    templateUrl: './resend.page.html',
    styleUrls: ['./resend.page.scss']
})
export class ResendPage implements OnInit, AfterViewInit {
    email = '';

    constructor(
        public router: Router,
        public userApi: UserApiService,
        public notify: NotifyService,
        public settings: SettingsService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    onSubmit() {
        if (this.email == '') {
            this.notify.showWarning('Please enter email address');
            return;
        }

        this.settings.loading = true;
        this.userApi.sendActivateEmail({
            email: this.email
        }).subscribe((res:any) => {
            this.settings.loading = false;

            if (res.success) {
                this.notify.showSuccess('Email was sent successfully. Please check your email.');
                this.router.navigate(['confirmemail']);
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }
}
