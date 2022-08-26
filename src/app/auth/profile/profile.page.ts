import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from "../../services/settings.service";
import {AccountApiService} from "../../services/accountApi.service";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
    profile: any = {};
    loginData: any = [];

    constructor(public router: Router,
                public settings: SettingsService,
                public accountApi: AccountApiService
                ) {
    }

    ngOnInit() {
        this.accountApi.getProfile({}).subscribe((res:any) => {
            if (res.success) {
                this.profile = res.data;

                if (!this.profile.verify_status) {
                    this.profile.verify_status = 0;
                }

            }
        });

        this.accountApi.getLoginHistory({}).subscribe((res:any) => {
            if (res.success) {
                this.loginData = res.data;
            }
        });
    }

    onChangePassword() {
        this.router.navigate(['/changepwd']);
    }

    onUpdateBank() {
        this.router.navigate(['/bank']);
    }

    onEnableSMS() {
        this.router.navigate(['/smsauth']);
    }

    onVerifyNow() {
        this.router.navigate(['/verifyidentity']);
    }
}
