/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {ApiService} from "./api.service";
import {SettingsService} from "./settings.service";
import {HttpClient} from "@angular/common/http";

declare const $: any;

@Injectable()
export class SystemService {
    constructor(
        public api: ApiService,
        public settings: SettingsService,
        private http: HttpClient
    ) {
    }

    init() {
        this.getSystemSettings();

        // this.loadRate();
        //
        // let _parent = this;
        // let timeID = setInterval(function () {
        //     _parent.loadRate();
        // }, 60000);
    }

    loadRate() {
        let _parent = this;
        this.api.getCurrencyRate().subscribe((res: any) => {
            if (res.success) {
                this.settings.rate.USD = res.USD;
                this.settings.rate.EUR = res.EUR;
            }
        });
    }

    getSystemSettings() {
        this.api.getSystemSettings({}).subscribe((res: any) => {
            if (res.success) {
                this.settings.system = res.data;
            }
        }, err => {
        });
    }
}

