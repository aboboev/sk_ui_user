import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TranslatorService} from "../services/translator.service";
import {SettingsService} from "../services/settings.service";
import {PusherService} from "../services/pusher.service";
import {AccountApiService} from "../services/accountApi.service";

declare var $: any;

@Component({
    templateUrl: './layout.page.html',
    styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit, AfterViewInit {
    currentLang: any = {};

    constructor(public router: Router,
                public settings: SettingsService,
                public translator: TranslatorService,
                public accountApi: AccountApiService,
                public pusher: PusherService
    ) {
    }

    ngOnInit() {
        this.currentLang = this.translator.getCurrentLang();
    }

    ngAfterViewInit() {
    }

    setLang(code) {
        this.translator.useLanguage(code);

        this.currentLang = this.translator.getCurrentLang();
    }

    onClickLogin() {
        this.router.navigate(['login']);
    }
    onClickSignup() {
        this.router.navigate(['signup']);
    }

    logout() {
        this.accountApi.logout({}).subscribe((res:any) => {

        });
        this.settings.setAppSetting('is_loggedin', false);
        this.settings.user = {};
        this.settings.setStorage('token', false);

        this.pusher.disconnect();

        this.router.navigate(['/login']);
    }
}
