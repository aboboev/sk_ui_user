import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InlineSVGModule} from 'ng-inline-svg';
import {TooltipModule} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {HomePage} from "./home/home.page";
import {NotFoundPage} from "./404/404.page";
import {OwlModule} from "ngx-owl-carousel";
import {ServicesModule} from "./services/services.module";
import {LoginPage} from "./user/login/login.page";
import {SharedModule} from "./shared/shared.module";
import {ForgotPage} from "./user/forgot/forgot.page";
import {ResetPwdPage} from "./user/resetPwd/resetPwd.page";
import {ResendPage} from "./user/resend/resend.page";
import {ConfirmemailPage} from "./user/confirmemail/confirmemail.page";
import {SignupPage} from "./user/signup/signup.page";
import {SetauthPage} from "./user/setauth/setauth.page";
import {ConfirmauthPage} from "./user/confirmauth/confirmauth.page";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutPage} from "./layout/layout.page";
import {FAQPage} from "./user/faq/faq.page";
import {AnnouncementPage} from "./user/announcement/announcement.page";
import {AnnouncementDetailPage} from "./user/announcementdetail/announcementdetail.page";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        LoginPage,
        ForgotPage,
        ResetPwdPage,
        ResendPage,
        ConfirmemailPage,
        SignupPage,
        SetauthPage,
        ConfirmauthPage,
        NotFoundPage,
        LayoutPage,
        FAQPage,
        AnnouncementPage,
        AnnouncementDetailPage
    ],
    imports: [
        OwlModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        InlineSVGModule.forRoot(),
        TooltipModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ServicesModule,
        SharedModule,
        BrowserAnimationsModule

],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
