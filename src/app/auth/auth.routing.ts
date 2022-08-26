import {Routes, RouterModule} from '@angular/router';
import {LayoutPage} from "../layout/layout.page";
import {MarketPage} from "./market/market.page";
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

export const AuthRoutes: Routes = [
    {path: 'market', component: MarketPage},
    {path: 'balance', component: BalancePage},
    {path: 'deposit', component: DepositPage},
    {path: 'withdraw', component: WithdrawPage},
    {path: 'transactions', component: TransactionPage},
    {path: 'tlwallet', component: TlwalletPage},
    {path: 'usdwallet', component: UsdwalletPage},
    {path: 'eurowallet', component: EurowalletPage},
    {path: 'profile', component: ProfilePage},
    {path: 'changepwd', component: ChangePasswordPage},
    {path: 'bank', component: BankPage},
    {path: 'smsauth', component: SMSAuthPage},
    {path: 'googleauth', component: GoogleAuthPage},
    {path: 'emailauth', component: EmailAuthPage},
    {path: 'verifyidentity', component: VerifyIdentityPage},
];
