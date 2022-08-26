import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from "@angular/router";
import {AuthRoutes} from "./auth.routing";
import {SharedModule} from "../shared/shared.module";
import {MarketPage} from "./market/market.page";
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import * as highstock from "highcharts/modules/stock.src";
import {BalancePage} from "./balance/balance.page";
import {DepositPage} from "./deposit/deposit.page";
import {WithdrawPage} from "./withdraw/withdraw.page";
import {TransactionPage} from "./transaction/transaction.page";
import {TlwalletPage} from "./tlwallet/tlwallet.page";
import {UsdwalletPage} from "./usdwallet/usdwallet.page";
import {EurowalletPage} from "./eurowallet/eurowallet.page";
import {ProfilePage} from "./profile/profile.page";
import {ChangePasswordPage} from "./changepassword/changepassword.page";
import {BankPage} from "./bank/bank.page";
import {SMSAuthPage} from "./smsauth/smsauth.page";
import {GoogleAuthPage} from "./googleauth/googleauth.page";
import {EmailAuthPage} from "./emailauth/emailauth.page";
import {VerifyIdentityPage} from "./verifyidentity/verifyidentity.page";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes),
        SharedModule,
        ChartModule
    ],
    declarations: [
        MarketPage,
        BalancePage,
        DepositPage,
        WithdrawPage,
        TransactionPage,
        TlwalletPage,
        UsdwalletPage,
        EurowalletPage,
        ProfilePage,
        ChangePasswordPage,
        BankPage,
        SMSAuthPage,
        GoogleAuthPage,
        EmailAuthPage,
        VerifyIdentityPage
    ],
    providers: [
        {
            provide: HIGHCHARTS_MODULES,
            useFactory: () => [ highstock ]
        }
    ]
})
export class AuthModule { }
