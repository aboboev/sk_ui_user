import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CoinApiService} from "../../services/coinApi.service";
import {NotifyService} from "../../services/notify.service";
import {BalanceService} from "../../services/balance.service";
import {ValidateService} from "../../services/validate.service";
import {Base58Service} from "../../services/base58.service";
import {SettingsService} from "../../services/settings.service";
import {AccountApiService} from "../../services/accountApi.service";

declare const swal: any;
declare const ripple: any;
declare const bchaddr: any;
declare const $: any;

@Component({
    selector: 'app-withdrawal-page',
    templateUrl: './withdraw.page.html',
    styleUrls: ['./withdraw.page.scss']
})
export class WithdrawPage implements OnInit, AfterViewInit {
    selCoin = 'BTC';
    selCoinInfo: any = {
        fullname: ''
    };
    coins: any = [];

    withdrawTx: any = [];

    allowed_g2f = 0;
    showAuthModal = false;
    auth_code = '';

    withdraw: any = {
        to_amount: 0,
        use_tag: false,
        use_memo: false,
        use_paymentid: false,
        hexAddress: ''
    };

    mainWallet: any = {
        address: '',
        minimum_amount: 0
    };

    constructor(public router: Router,
                public coinApi: CoinApiService,
                public accountApi: AccountApiService,
                public notify: NotifyService,
                public balance: BalanceService,
                public validate: ValidateService,
                public base58: Base58Service,
                public settings: SettingsService
                ) {
    }

    ngOnInit() {
        if (window.localStorage.getItem('withdraw_coin') && window.localStorage.getItem('withdraw_coin') != '') {
            this.selCoin = window.localStorage.getItem('withdraw_coin');
        }

        this.allowed_g2f = this.settings.getUserSetting('allowed_g2f');

        this.coinApi.getCoin({
            only_coin: true
        }).subscribe((res:any) => {
            if (res.success) {
                this.coins = res.data;
                this.selCoinInfo = this.coins.filter(coin => coin.coin === this.selCoin)[0];
            }
        }, err => {

        });

        this.coinApi.getXRPMainWallet({}).subscribe( (res:any) => {
            if (res.success) {
                this.mainWallet.address = res.address;
                this.mainWallet.minimum_amount = res.minimum_amount;
            }
        }, err => {

        });

        this.getWithdrawList();
    }


    ngAfterViewInit() {
        $('.select2').select2();

        let _parent = this;
        $('.select2').on('select2:select', function (e) {
            _parent.onClickCoin(e.params.data.id);
        });
    }

    onClickCoin(coin) {
        if (coin == this.selCoin) {
            return;
        }

        this.selCoin = coin;
        this.selCoinInfo = this.coins.filter(coin => coin.coin == this.selCoin)[0];

        this.withdraw = {
            to_amount: 0,
            use_tag: false,
            use_memo: false,
            use_paymentid: false
        };

        this.getWithdrawList();

        window.localStorage.setItem('withdraw_coin', this.selCoin);
    }

    getWithdrawList() {
        this.coinApi.getWithdrawHistory(this.selCoin, {}).subscribe((res:any) => {
            if (res.success) {
                this.withdrawTx = res.data;
            } else {

            }
        }, err => {
        });
    }

    copyAddress(id) {
        $('#' + id).select();
        document.execCommand('copy');

        window.getSelection().removeAllRanges();
    }

    refreshWithdrawList() {
        this.balance.getCoinBalance(this.selCoin);

        this.getWithdrawList();
    }

    withdrawAll() {
        this.withdraw.to_amount = this.settings.getBalance(this.selCoin);
    }

    submitWithdraw() {
        this.settings.loading = true;
        this.coinApi.requestWithdraw(this.selCoin, {
            address: this.withdraw.to_address,
            amount: this.withdraw.to_amount,
            destination_tag: this.withdraw.to_tag,
            memo: this.withdraw.memo,
            public_key: this.withdraw.public_key,
            auth_code: this.auth_code,
            paymentid: this.withdraw.paymentid
        }).subscribe((res:any) => {
            this.settings.loading = false;

            if (res.success) {
                this.notify.showSuccess('We have sent confirmation email for withdraw. Please check your registered email and confirm your withdraw.');
                this.getWithdrawList();
                this.balance.getCoinBalance(this.selCoin);

                this.showAuthModal = false;
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showWarning(err);
        });
    }

    withdrawCoin() {
        if (this.settings.getUserSetting('account_verified') == 0) {
            this.notify.showWarning('You have to verify your account.');
            return;
        }

        if (this.withdraw.to_address == null || this.withdraw.to_address == '') {
            this.notify.showWarning('Please enter Address');
            return;
        }

        if (this.withdraw.to_amount - Number(this.selCoinInfo.withdraw_fee) < this.selCoinInfo.min_withdraw) {
            this.notify.showWarning('Please enter greater than minimual withdraw amount.');
            return;
        }

        if (this.selCoin == 'XRP') {
            var UInt160 = ripple.UInt160;
            if (!UInt160.is_valid(this.withdraw.to_address)) {
                this.notify.showWarning('Address is invalid.');
                return;
            }
            if (this.withdraw.to_amount < this.mainWallet.minimum_amount) {
                this.notify.showWarning('Minimal Withdraw amount is ' + this.mainWallet.minimum_amount + ' XRP.');
                return;
            }
            if (this.withdraw.use_tag && (this.withdraw.to_tag == null || this.withdraw.to_tag == '')) {
                this.notify.showWarning('Please enter destination tag.');
                return;
            }
        }

        if (this.selCoin == 'CVN' || this.selCoin == 'DEEX' || this.selCoin == 'SCR') {
            if (this.withdraw.use_memo && (this.withdraw.memo == null || this.withdraw.memo == '')) {
                this.notify.showWarning('Please input memo.');
                return;
            }
        }

        if (this.selCoin == 'TRX') {
            let hexAddress = this.base58.decode(this.withdraw.to_address);
            if (hexAddress === false) {
                this.notify.showWarning('Wrong address');
                return;
            }
        }

        if (this.selCoin == 'ETN') {
            if (this.withdraw.use_paymentid && (this.withdraw.paymentid == null || this.withdraw.paymentid == '')) {
                this.notify.showWarning('Please input payment id.');
                return;
            }
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

    cancelWithdraw(id) {
        if (id == null || id == 0) {
            return;
        }

        let _parent = this;
        swal({
            title: 'Are you sure?',
            text: 'Your withdraw transaction will be removed permanently.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }, function () {
            _parent.settings.loading = true;
            _parent.coinApi.cancelWithdraw(_parent.selCoin, {
                id: id,
            }).subscribe((res:any) => {
                _parent.settings.loading = false;

                if (res.success) {
                    _parent.notify.showSuccess('Your withdrawal was canceled successfully.');
                    _parent.getWithdrawList();
                    _parent.balance.getCoinBalance(_parent.selCoin);
                } else {
                    _parent.notify.showWarning(res.error);
                }
            }, err => {
                _parent.settings.loading = false;
            });
        });
    }
}
