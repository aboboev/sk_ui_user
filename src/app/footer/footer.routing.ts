import {Routes, RouterModule} from '@angular/router';
import {LayoutPage} from "../layout/layout.page";
import {ContactUsPage} from "./contactus/contactus.page";
import {TermsAndConditionsPage} from "./termsandconditions/termsandconditions.page";
import {SellcoinPage} from "./sellcoin/sellcoin.page";
import {OverviewPage} from "./overview/overview.page";
import {BuycoinPage} from "./buycoin/buycoin.page";

export const FooterRoutes: Routes = [
    {path: 'contactus', component: ContactUsPage},
    {path: 'terms', component: TermsAndConditionsPage},
    {path: 'buycoin', component: BuycoinPage},
    {path: 'overview', component: OverviewPage},
    {path: 'sellcoin', component: SellcoinPage},
];
