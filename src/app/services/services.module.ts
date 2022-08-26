/**
 * Created by ApolloYr on 11/18/2017.
 */

import {NgModule} from '@angular/core';
import {TranslatorService} from "./translator.service";
import {ValidateService} from "./validate.service";
import {SettingsService} from "./settings.service";
import {ApiService} from "./api.service";
import {UserApiService} from "./userApi.service";
import {NotifyService} from "./notify.service";
import {PusherService} from "./pusher.service";
import {SystemService} from "./system.service";
import {CoinApiService} from "./coinApi.service";
import {BalanceService} from "./balance.service";
import {MarketApiService} from "./marketApi.service";
import {AccountApiService} from "./accountApi.service";
import {AuthguardService} from "./authguard.service";
import {Base58Service} from "./base58.service";
import {FinanceApiService} from "./financeApi.service";
import {AuthcheckService} from "./authcheck.service";
import {CountryNameService} from "./countryname.service";

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        TranslatorService,
        ValidateService,
        SettingsService,
        NotifyService,
        ApiService,
        UserApiService,
        BalanceService,
        PusherService,
        SystemService,
        CoinApiService,
        MarketApiService,
        AccountApiService,
        AuthguardService,
        Base58Service,
        FinanceApiService,
        AuthcheckService,
        CountryNameService
    ],
    exports: []
})
export class ServicesModule {
}
