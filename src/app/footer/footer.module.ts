import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from "@angular/router";
import {FooterRoutes} from "./footer.routing";
import {SharedModule} from "../shared/shared.module";
import {ContactUsPage} from "./contactus/contactus.page";
import {TermsAndConditionsPage} from "./termsandconditions/termsandconditions.page";
import {BuycoinPage} from "./buycoin/buycoin.page";
import {SellcoinPage} from "./sellcoin/sellcoin.page";
import {OverviewPage} from "./overview/overview.page";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FooterRoutes),
        SharedModule,
    ],
    declarations: [
        ContactUsPage,
        TermsAndConditionsPage,
        BuycoinPage,
        SellcoinPage,
        OverviewPage
    ]
})
export class FooterModule { }
