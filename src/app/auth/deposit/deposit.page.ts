import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {CoinApiService} from "../../services/coinApi.service";
import {BalanceService} from "../../services/balance.service";

declare const swal: any;
declare const bchaddr: any;
declare const $: any;

@Component({
    selector: 'app-deposit-page',
    templateUrl: './deposit.page.html',
    styleUrls: ['./deposit.page.scss']
})
export class DepositPage implements OnInit {
    selCoin = 'BTC';
    selCoinAddress = '';
    selCoinInfo: any = {
        fullname: ''
    };
    coins: any = [];

    coinAddress: any = {};
    XINPublicKey = '';

    depositTx: any = [];

    mainWallet: any = {
        address: '',
        minimum_amount: 0
    };

    showQRCodeModal = false;
    qrCodeValue = '';

    constructor(
        public router: Router,
        public settings: SettingsService,
        public notify: NotifyService,
        public coinApi: CoinApiService,
        public balance: BalanceService
        ) {
    }

    ngOnInit() {
        if (window.localStorage.getItem('deposit_coin') && window.localStorage.getItem('deposit_coin') != '') {
            this.selCoin = window.localStorage.getItem('deposit_coin');
        }

        this.coinApi.getCoin({
            only_coin: true
        }).subscribe((res:any) => {
            if (res.success) {
                this.coins = res.data;
                this.selCoinInfo = this.coins.filter(coin => coin.coin === this.selCoin)[0];

                this.coinApi.getCoinAddress({}).subscribe((res:any) => {
                    if (res.success) {
                        this.coinAddress = res.data;

                        this.selCoinAddress = this.getAddress(this.selCoinInfo);
                        if (this.selCoin == 'XIN') {
                            this.coinApi.getXINPublicKey({
                                address: this.selCoinAddress
                            }).subscribe((res:any) => {
                                if (res.success) {
                                    this.XINPublicKey = res.publicKey;
                                }
                            });
                        }
                    }
                });
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

        this.getDepositList();
    }

    getAddress(coinInfo) {
        let coin = coinInfo.address_coin ? coinInfo.address_coin : coinInfo.coin;

        if (coin == 'ETN' && this.coinAddress['etn_paymentid'] && this.coinAddress['etn_paymentid'] != '') {
            return this.coinAddress['etn_paymentid'];
        } else if (coin == 'ETN') {
            return '';
        }

        let index = coin.toLowerCase() + '_address';

        if (this.coinAddress && this.coinAddress[index] && this.coinAddress[index] != '') {
            if (coin == 'BCH') {
                return bchaddr.toLegacyAddress(this.coinAddress[index]);
            } else if (coin == 'ETN') {
                return this.coinAddress['etn_paymentid'];
            }
            return this.coinAddress[index];
        } else {
            return '';
        }
    }

    setAddress(coinInfo, address) {
        let coin = coinInfo.address_coin ? coinInfo.address_coin : coinInfo.coin;

        let index = coin.toLowerCase() + '_address';

        if (coin == 'ETN') {
            this.coinAddress['etn_paymentid'] = address;
        } else {
            this.coinAddress[index] = address;
        }
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
        this.selCoinAddress = this.getAddress(this.selCoinInfo);

        this.getDepositList();

        window.localStorage.setItem('deposit_coin', this.selCoin);
    }

    createWallet() {
        this.settings.loading = true;
        this.coinApi.createWallet(this.selCoin, {}).subscribe((res:any) => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showSuccess('Your wallet was created successfully.');

                this.setAddress(this.selCoinInfo, res.address);
                this.selCoinAddress = this.getAddress(this.selCoinInfo);
                if (this.selCoin == 'XIN') {
                    this.XINPublicKey = res.publicKey;
                }
            } else {
                this.notify.showWarning(res.error);
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showError(err);
        });
    }

    getDepositList() {
        this.coinApi.getDepositHistory(this.selCoin, {}).subscribe((res:any) => {
            if (res.success) {
                this.depositTx = res.data;
            } else {

            }
        }, err => {
        });
    }

    copyAddress(id) {
        $('#' + id).select();
        document.execCommand('copy');

        window.getSelection().removeAllRanges();

        this.notify.showSuccess('Copied');
    }

    showQRCode(value) {
        this.qrCodeValue = value;
        console.log(this.qrCodeValue);
        this.showQRCodeModal = true;
    }

    refreshDepositList() {
        this.balance.getCoinBalance(this.selCoin);

        this.getDepositList();
    }
}
