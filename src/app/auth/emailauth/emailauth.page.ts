import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountApiService} from "../../services/accountApi.service";

declare const $: any;

@Component({
    selector: 'app-smsauth-page',
    templateUrl: './emailauth.page.html',
    styleUrls: ['./emailauth.page.scss']
})
export class EmailAuthPage implements OnInit, AfterViewInit {
    profile: any = {};

    constructor(public router: Router,
                public accountApi: AccountApiService) {
    }

    ngOnInit() {
        this.accountApi.getProfile({}).subscribe((res:any) => {
            if (res.success) {
                this.profile = res.data;
            }
        });
    }

    ngAfterViewInit() {
    }
}
