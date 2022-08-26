import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FinanceApiService} from "../../services/financeApi.service";
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {TranslatorService} from "../../services/translator.service";
import {BalanceService} from "../../services/balance.service";
import {AccountApiService} from "../../services/accountApi.service";

declare const $:any;
@Component({
    selector: 'app-eurowallet-page',
    templateUrl: './eurowallet.page.html',
    styleUrls: ['./eurowallet.page.scss']
})
export class EurowalletPage implements OnInit {
    profile: any = {};
    iban_code_euro = '';

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

    showEPayDespositModal = false;
    showEPayWithdrawModal = false;
    isEpayWithdraw = false;

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

                if (this.profile && this.profile.iban_code_euro) {
                    this.iban_code_euro = this.profile.iban_code_euro;

                    this.withdraw.to_address = this.iban_code_euro;
                    this.deposit.from_address = this.iban_code_euro;
                }
            }
        });

        this.financeApi.getBanks({
            currency: 'EURO'
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

    withdrawEUROAll() {
        this.withdraw.amount = this.settings.getBalance('EURO');
    }

    loadPendingTransactions() {
        this.financeApi.getFinanceTransaction('EURO', {
            is_pending: true,
            limit_count: 20
        }).subscribe( (res:any) => {
            if (res.data) {
                this.pendingLists = res.data;
            }
        });
    }

    loadPastTransactions() {
        this.financeApi.getFinanceTransaction('EURO', {
            is_success: true,
            limit_count: 20
        }).subscribe( (res:any) => {
            if (res.data) {
                this.pastLists = res.data;
            }
        });
    }

    depositEURO() {
        this.deposit.fee = this.settings.getSystemSetting('euro_deposit_fee');

        this.settings.loading = true;
        this.financeApi.financeDeposit('EURO', this.deposit).subscribe( (res:any) => {
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
        this.withdraw.isEpay = this.isEpayWithdraw;
        this.withdraw.fee = this.settings.getSystemSetting('euro_withdraw_fee');
        this.withdraw.auth_code = this.auth_code;

        this.settings.loading = true;
        this.financeApi.financeWithdraw('EURO', this.withdraw).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.showAuthModal = false;

                this.loadPendingTransactions();
                this.balance.getCoinBalance('EURO');

                this.notify.showSuccess('Your withdraw was saved successfully. Please wait while confirming.');
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });

    }

    withdrawEURO() {
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
                this.balance.getCoinBalance('EURO');
                this.loadPendingTransactions();
                this.notify.showSuccess('Your transaction was canceled successfully.');
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }


    onClickDepositEpay() {
        this.showEPayDespositModal = true;
    }

    onClickWithdrawEpay() {
        this.showEPayWithdrawModal = true;
    }

    submitEpayDeposit() {
        if (this.deposit.amount == null || this.deposit.amount < 100) {
            this.notify.showWarning('You have to input amount greater than 100.');
            return;
        }

        this.settings.loading = true;
        this.financeApi.getEpayReceiveInfo({
            amount: this.deposit.amount,
            currency: 'EURO'
        }).subscribe( (res:any) => {
            this.settings.loading = false;
            if (res.success) {
                $('#PAYMENT_ID').val(res.paymentID);
                $('#V2_HASH').val(res.v2Hash);

                $('#form').submit();
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }

    submitEpayWithdraw() {
        if (this.settings.getUserSetting('account_verified') == 0) {
            this.notify.showWarning('You have to verify your account.');
            return;
        }

        if (this.withdraw.amount == null || this.withdraw.amount < 100) {
            this.notify.showWarning('You have to input amount greater than 100.');
            return;
        }

        if (this.withdraw.epay_account == null || this.withdraw.epay_account == '') {
            this.notify.showWarning('You have to input your account.');
            return;
        }

        this.showEPayWithdrawModal = false;
        this.isEpayWithdraw = true;
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
}
