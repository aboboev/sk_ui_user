import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AccountApiService} from "../../services/accountApi.service";
import {NotifyService} from "../../services/notify.service";
import {SettingsService} from "../../services/settings.service";

@Component({
    selector: 'app-bank-page',
    templateUrl: './bank.page.html',
    styleUrls: ['./bank.page.scss']
})
export class BankPage implements OnInit {
    bank: any = {
        iban_code: '',
        iban_code_usd: '',
        iban_code_euro: ''
    };

    constructor(public router: Router,
                public accountApi: AccountApiService,
                public notify: NotifyService,
                public settings: SettingsService) {
    }

    ngOnInit() {
        this.accountApi.getAccountBankInfo({}).subscribe((res:any) => {
            if (res.success) {
                this.bank = res.data;
            }
        }, err => {

        });
    }

    onUpdateBank() {
        this.accountApi.saveAccountBankInfo(this.bank).subscribe((res:any) => {
            if (res.success) {
                this.notify.showSuccess('IBAN CODE was updated successfully.');

                this.settings.setUserSetting('iban_code', this.bank.iban_code);
                this.settings.setUserSetting('iban_code_usd', this.bank.iban_code_usd);
                this.settings.setUserSetting('iban_code_euro', this.bank.iban_code_euro);
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.notify.showError(err);
        });
    }

}
