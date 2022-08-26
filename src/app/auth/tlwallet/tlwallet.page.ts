import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FinanceApiService} from "../../services/financeApi.service";
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {TranslatorService} from "../../services/translator.service";
import {BalanceService} from "../../services/balance.service";
import {AccountApiService} from "../../services/accountApi.service";

@Component({
    selector: 'app-tlwallet-page',
    templateUrl: './tlwallet.page.html',
    styleUrls: ['./tlwallet.page.scss']
})
export class TlwalletPage implements OnInit {
    profile: any = {};
    iban_code = '';

    pendingLists: any = [];
    pastLists: any = [];

    withdraw:any = {
        amount: 0
    };
    deposit:any = {
        amount: 0
    };

    banks: any = [];

    depositinfo: any = {};
    deposited = false;

    allowed_g2f = 0;
    showAuthModal = false;
    auth_code = '';

    constructor(public router: Router,
                public financeApi: FinanceApiService,
                public settings: SettingsService,
                public notify: NotifyService,
                public translator: TranslatorService,
                public accountApi: AccountApiService,
                public balance: BalanceService
                ) {
    }


    ngOnInit() {
        this.accountApi.getAccountBankInfo({}).subscribe( (res:any) => {
            if (res.success) {
                this.profile = res.data;
                if (this.profile && this.profile.iban_code) {
                    this.iban_code = this.profile.iban_code;

                    this.withdraw.to_address = this.iban_code;
                    this.deposit.from_address = this.iban_code;
                }
            }
        });

        this.financeApi.getBanks({
            currency: 'TL'
        }).subscribe( (res:any) => {
            if (res.success) {
                this.banks = res.data;
            }
        });

        this.loadPendingTransactions();
        this.loadPastTransactions();
    }

    ngAfterViewInit() {
    }

    withdrawTLAll() {
        this.withdraw.amount = this.settings.getBalance('TL');
    }

    loadPendingTransactions() {
        this.financeApi.getFinanceTransaction('TL', {
            is_pending: true,
            limit_count: 20
        }).subscribe( (res:any) => {
            if (res.data) {
                this.pendingLists = res.data;
            }
        });
    }

    loadPastTransactions() {
        this.financeApi.getFinanceTransaction('TL', {
            is_success: true,
            limit_count: 20
        }).subscribe( (res:any) => {
            if (res.data) {
                this.pastLists = res.data;
            }
        });
    }

    depositTL() {
        this.deposit.fee = this.settings.getSystemSetting('tl_deposit_fee');

        this.settings.loading = true;
        this.financeApi.financeDeposit('TL', this.deposit).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.loadPendingTransactions();
                this.notify.showSuccess('Your deposit was saved successfully. Please wait while confirming.');

                this.depositinfo = res.data;
                for (var i = 0; i < this.banks.length; i ++) {
                    if (this.banks[i].name == this.depositinfo.to_address) {
                        this.depositinfo.iban_code = this.banks[i].iban_code;
                        break;
                    }
                }

                this.depositinfo.amount = this.deposit.amount;

                this.deposited = true;
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }

    submitWithdraw() {
        this.withdraw.fee = this.settings.getSystemSetting('tl_withdraw_fee');
        this.withdraw.auth_code = this.auth_code;

        this.settings.loading = true;
        this.financeApi.financeWithdraw('TL', this.withdraw).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.showAuthModal = false;

                this.loadPendingTransactions();
                this.balance.getCoinBalance('TL');

                this.notify.showSuccess('Your withdraw was saved successfully. Please wait while confirming.');
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });

    }

    withdrawTL() {
        if (this.settings.getUserSetting('account_verified') == 0) {
            this.notify.showWarning('You have to verify your account.');
            return;
        }

        this.settings.loading = true;
        this.accountApi.sendAuthCode().subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.auth_code = '';
                this.allowed_g2f = res.allowed_g2f;
                this.showAuthModal = true;
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }

    cancelTransaction(id) {
        this.settings.loading = true;
        this.financeApi.cancelFinanceTransaction({
            id: id
        }).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.balance.getCoinBalance('TL');
                this.loadPendingTransactions();
                this.notify.showSuccess('Your transaction was canceled successfully.');
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }
}
