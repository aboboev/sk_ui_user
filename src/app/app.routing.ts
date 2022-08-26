import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {NotFoundPage} from "./404/404.page";
import {LoginPage} from "./user/login/login.page";
import {ForgotPage} from "./user/forgot/forgot.page";
import {ResetPwdPage} from "./user/resetPwd/resetPwd.page";
import {ResendPage} from "./user/resend/resend.page";
import {ConfirmemailPage} from "./user/confirmemail/confirmemail.page";
import {SignupPage} from "./user/signup/signup.page";
import {SetauthPage} from "./user/setauth/setauth.page";
import {ConfirmauthPage} from "./user/confirmauth/confirmauth.page";
import {AuthguardService} from "./services/authguard.service";
import {AuthcheckService} from "./services/authcheck.service";
import {LayoutPage} from "./layout/layout.page";
import {FAQPage} from "./user/faq/faq.page";
import {AnnouncementPage} from "./user/announcement/announcement.page";
import {AnnouncementDetailPage} from "./user/announcementdetail/announcementdetail.page";

export const AppRoutes: Routes = [
    { path: '', component: HomePage },
    {
        path: '',
        component: LayoutPage,
        loadChildren: './auth/auth.module#AuthModule',
        resolve: {
            AuthguardService
        }
    },
    {
        path: '',
        component: LayoutPage,
        loadChildren: './footer/footer.module#FooterModule',
        resolve: {
            AuthcheckService
        }
    },
    { path: 'login', component: LoginPage },
    { path: 'confirmemail', component: ConfirmemailPage },
    { path: 'forgot', component: ForgotPage },
    { path: 'reset_password/:code', component: ResetPwdPage },
    { path: 'resend', component: ResendPage },
    { path: 'ref/:code', component: SignupPage },
    { path: 'signup', component: SignupPage },
    { path: 'setauth', component: SetauthPage },
    { path: 'confirmauth', component: ConfirmauthPage },
    { path: 'faq', component: FAQPage },
    { path: 'announce', component: AnnouncementPage },
    { path: 'announcedetail', component: AnnouncementDetailPage },
    { path: '404', component: NotFoundPage },
    { path: '**', redirectTo: '404' }
];
