import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountApiService} from "../../services/accountApi.service";

declare const $: any;

@Component({
    selector: 'app-smsauth-page',
    templateUrl: './smsauth.page.html',
    styleUrls: ['./smsauth.page.scss']
})
export class SMSAuthPage implements OnInit, AfterViewInit {
    profile: any = {};

    constructor(public router: Router,
                public accountApi: AccountApiService) {
    }

    ngOnInit() {
        this.accountApi.getProfile({}).subscribe((res:any) => {
            if (res.success) {
                this.profile = res.data;
            }
        });
    }

    ngAfterViewInit() {
        let parent = this;

        let smsTimer = setInterval(function() {
            if ($('#phone').length > 0 && typeof $("#phone").intlTelInput("getNumber") !== 'string' && parent.profile.phone_number) {

                $("#phone").intlTelInput({
                    placeholderNumberType: "MOBILE",
                    preferredCountries: ['tr'],
                    separateDialCode: true,
                    utilsScript: 'assets/js/utils.js'
                });

                $("#phone").intlTelInput("setNumber", parent.profile.phone_number);
                $('.intl-tel-input').css('width', '100%');

                clearInterval(smsTimer);
            }
        }, 200);
    }
}
