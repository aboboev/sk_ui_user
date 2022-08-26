import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OwlModule} from 'ngx-owl-carousel';

import {SharedModule} from '../shared/shared.module';
import {LayoutModule} from './layout/layout.module';
import {MainLayoutComponent} from './layout/mainlayout/mainlayout.component';
import {HomePage} from '../home/home.page';
import {FAQPage} from './faq/faq.page';
import {AboutUsPage} from './aboutus/aboutus.page';
import {AnnouncementPage} from './announcement/announcement.page';
import {AnnouncementDetailPage} from './announcementdetail/announcementdetail.page';
import {AntiPhishingPage} from './antiphishing/antiphishing.page';
import {BalancePage} from './balance/balance.page';
import {CoinOfMonthPage} from './coinofmonth/coinofmonth.page';
import {ContactUsPage} from './contactus/contactus.page';
import {DepositPage} from './deposit/deposit.page';
import {GoogleAuthPage} from './googleauth/googleauth.page';
import {HistoryPage} from './history/history.page';
import {NewsPage} from './news/news.page';
import {LevelPage} from './level/level.page';
import {ChangePasswordPage} from './changepassword/changepassword.page';
import {SMSAuthPage} from './smsauth/smsauth.page';
import {TermsAndConditionsPage} from './termsandconditions/termsandconditions.page';
import {TicketPage} from './ticket/ticket.page';
import {TransactionPage} from './transaction/transaction.page';
import {VerifyIdentityPage} from './verifyidentity/verifyidentity.page';
import {WithdrawalPage} from './withdrawal/withdrawal.page';
import {WithdrawalAddressPage} from './withdrawaladdress/withdrawaladdress.page';
import {NewDevicePage} from './newdevice/newdevice.page';
import {ResetPasswordPage} from './resetpassword/resetpassword.page';
import {SignupEmailPage} from './signupemail/signupemail.page';
import {SignupPage} from './signup/signup.page';
import {ProfilePage} from './profile/profile.page';
import {ProfileDeviceComponent} from './profile/profiledevice/profiledevice.component';

export const routes = [
    {path: 'newdevice', component: NewDevicePage},
    {path: 'reset-password', component: ResetPasswordPage},
    {path: 'signup-email', component: SignupEmailPage},
    {path: 'signup', component: SignupPage},
    {path: '', component: HomePage, pathMatch: 'full'},
    {
        path: '',
        component: MainLayoutComponent,
        resolve: {},
        children: [
            {path: 'faq', component: FAQPage},
            {path: 'about-us', component: AboutUsPage},
            {path: 'announcement', component: AnnouncementPage},
            {path: 'announcement/:id', component: AnnouncementDetailPage},
            {path: 'anti-phishing', component: AntiPhishingPage},
            {path: 'balance', component: BalancePage},
            {path: 'contact-us', component: ContactUsPage},
            {path: 'coin-of-month', component: CoinOfMonthPage},
            {path: 'deposit', component: DepositPage},
            {path: 'google-auth', component: GoogleAuthPage},
            {path: 'history', component: HistoryPage},
            {path: 'news', component: NewsPage},
            {path: 'level', component: LevelPage},
            {path: 'change-password', component: ChangePasswordPage},
            {path: 'sms-auth', component: SMSAuthPage},
            {path: 'terms-conditions', component: TermsAndConditionsPage},
            {path: 'ticket', component: TicketPage},
            {path: 'transaction', component: TransactionPage},
            {path: 'verify-identity', component: VerifyIdentityPage},
            {path: 'withdrawal', component: WithdrawalPage},
            {path: 'withdrawal-address', component: WithdrawalAddressPage},
            {path: 'profile', component: ProfilePage},
            {path: 'market', loadChildren: './market/market.module#MarketModule'},
        ]
    }
];

@NgModule({
    imports: [
        OwlModule,
        SharedModule,
        LayoutModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        HomePage,
        FAQPage,
        AboutUsPage,
        AnnouncementPage,
        AnnouncementDetailPage,
        AntiPhishingPage,
        BalancePage,
        ContactUsPage,
        DepositPage,
        GoogleAuthPage,
        HistoryPage,
        NewsPage,
        LevelPage,
        ChangePasswordPage,
        SMSAuthPage,
        TermsAndConditionsPage,
        TicketPage,
        TransactionPage,
        VerifyIdentityPage,
        WithdrawalPage,
        WithdrawalAddressPage,
        NewDevicePage,
        ResetPasswordPage,
        SignupEmailPage,
        SignupPage,
        ProfilePage,
        ProfileDeviceComponent,
        CoinOfMonthPage
    ],
    providers: [],
    exports: [RouterModule]
})
export class PagesModule {
}
