import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AccountApiService} from "../../services/accountApi.service";
import {NotifyService} from "../../services/notify.service";

@Component({
    selector: 'app-changepassword-page',
    templateUrl: './changepassword.page.html',
    styleUrls: ['./changepassword.page.scss']
})
export class ChangePasswordPage implements OnInit {
    pwd: any = {
        curPassword: '',
        password: '',
        confirmPassword: ''
    };

    constructor(public router: Router,
                public accountApi: AccountApiService,
                public notify: NotifyService) {
    }

    ngOnInit() {
    }

    onChangePwd() {
        if (this.pwd.password == '' || this.pwd.curPassword == '') {
            this.notify.showWarning('Please enter current password and new Password');
            return;
        }

        if (this.pwd.password != this.pwd.confirmPassword) {
            this.notify.showWarning('Password does not match');
            return;
        }

        this.accountApi.changePassword(this.pwd).subscribe((res:any) => {
            if (res.success) {
                this.notify.showSuccess('Your password changed successfully.');
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.notify.showError(err);
        });
    }

}
