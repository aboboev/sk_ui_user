/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {SettingsService} from "./settings.service";
import {CoinApiService} from "./coinApi.service";

@Injectable()
export class BalanceService {
    constructor(
                public coinApi: CoinApiService,
                public settings: SettingsService) {
    }

    init() {

    }

    getCoinBalance(coin) {
        this.coinApi.getBalance(coin, {}).subscribe(res => {
            if (res.success) {
                this.settings.setBalance(coin, res.balance);
            } else {
            }
        }, err => {
        });
    }
}

