import {Component, AfterViewInit, OnInit} from '@angular/core';
import {TranslatorService} from "../../../services/translator.service";
@Component({
    selector: 'user-footer',
    templateUrl: './user-footer.component.html',
    styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit, AfterViewInit {
    currentLang: any = {};
    constructor(
        public translator: TranslatorService
    ) {


    }

    ngOnInit() {
        this.currentLang = this.translator.getCurrentLang();
    }


    setLang(code) {
        this.translator.useLanguage(code);

        this.currentLang = this.translator.getCurrentLang();
    }
    ngAfterViewInit() {
    }
}