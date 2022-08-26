import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidateService} from "../../services/validate.service";
import {SettingsService} from "../../services/settings.service";
import {ApiService} from "../../services/api.service";
import {UserApiService} from "../../services/userApi.service";
import {NotifyService} from "../../services/notify.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    login: FormGroup;
    loginInfo: any = {};

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        public validate: ValidateService,
        public settings: SettingsService,
        public userApi: UserApiService,
        public notify: NotifyService
        ) {
    }

    ngOnInit() {
        this.login = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        if (this.login.valid) {
            this.settings.loading = true;
            this.userApi.confirmPassword(this.loginInfo).subscribe((res:any) => {
                this.settings.loading = false;

                if (res.success) {
                    if (res.allowed_g2f == 0) {
                        this.settings.setUserSetting('email', this.loginInfo.email);
                        this.settings.setUserSetting('allowed_g2f', 0);

                        this.router.navigate(['/setauth']);
                    } else if (res.allowed_g2f > 0) {
                        this.settings.setUserSetting('email', this.loginInfo.email);
                        this.settings.setUserSetting('password', this.loginInfo.password);
                        this.settings.setUserSetting('allowed_g2f', res.allowed_g2f);

                        this.router.navigate(['/confirmauth']);
                    }
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err => {
                this.settings.loading = false;
                this.notify.showError(err);
            });
        } else {
            this.validate.validateAllFormFields(this.login);
        }
    }
}
