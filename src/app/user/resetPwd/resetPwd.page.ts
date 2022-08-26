import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {UserApiService} from "../../services/userApi.service";
import {NotifyService} from "../../services/notify.service";
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../shared/components/password-validator.component";
import {ValidateService} from "../../services/validate.service";

declare const $: any;

@Component({
    selector: 'app-forgot-page',
    templateUrl: './resetPwd.page.html',
    styleUrls: ['./resetPwd.page.scss']
})
export class ResetPwdPage implements OnInit, AfterViewInit {
    pwdForm: FormGroup;
    pwdInfo: any = {};

    constructor(
        public router: Router,
        public userApi: UserApiService,
        public notify: NotifyService,
        public settings: SettingsService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        public validate: ValidateService,
    ) {
        this.pwdInfo.confirm_code = this.activatedRoute.snapshot.params['code'];
    }

    ngOnInit() {

        this.pwdForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    ngAfterViewInit() {
    }

    onSubmit() {
        if (this.pwdForm.valid) {
            this.userApi.resetPassword(this.pwdInfo).subscribe((res:any) => {
                if (res.success) {
                    this.notify.showSuccess('Password was changed succesfully');
                    this.router.navigate(['/login']);
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.notify.showError(err);
            });
        } else {
            this.validate.validateAllFormFields(this.pwdForm);
        }
    }
}
