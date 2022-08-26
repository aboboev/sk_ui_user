import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../shared/components/password-validator.component";
import {ValidateService} from "../../services/validate.service";
import {NotifyService} from "../../services/notify.service";
import {SettingsService} from "../../services/settings.service";
import {UserApiService} from "../../services/userApi.service";

declare const $: any;

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit, AfterViewInit {
    signup: FormGroup;

    signupInfo: any = {
        agree: false
    };

    constructor(
        public router: Router,
        public formBuilder: FormBuilder,
        public validate: ValidateService,
        public notify: NotifyService,
        public settings: SettingsService,
        public userApi: UserApiService
    ) {
    }

    ngOnInit() {
        if (this.router.url.includes('/ref')) {
            let url = this.router.url;
            let ref_code = url.substring(url.lastIndexOf('/') + 1);

            this.settings.loading = true;
            this.userApi.getUserByRefCode({
                ref_code: ref_code
            }).subscribe((res:any) => {
                if (res.success) {
                    this.signupInfo.ref_code = ref_code;
                    this.signupInfo.ref_name = res.data.name;
                }
            });
        }

        this.signup = this.formBuilder.group({
            name: [null, Validators.required],
            surname: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            agree: [''],
            ref_name: ['']
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    ngAfterViewInit() {
        $('#phone').intlTelInput({
            placeholderNumberType: 'MOBILE',
            preferredCountries: ['tr'],
            separateDialCode: true,
            utilsScript: '/assets/js/utils.js'
        });

        $('.intl-tel-input').width('100%');
    }

    onSignup() {
        if (this.signup.valid) {
            if (!this.signupInfo.agree) {
                this.notify.showWarning('Lütfen kullanıcı sözleşmesini onaylayınız');
                return;
            }
            var intlNumber = $("#phone").intlTelInput("getNumber");

            this.signupInfo.phone_number = intlNumber;

            this.settings.loading = true;
            this.userApi.register(this.signupInfo).subscribe(res => {
                this.settings.loading = false;
                if (res.success) {
                    this.notify.showSuccess('Registered Successfully');
                    this.router.navigate(["/confirmemail"]);
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.settings.loading = false;
                this.notify.showError(err);
            });
        } else {
            this.validate.validateAllFormFields(this.signup);
        }
    }
}
