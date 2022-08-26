import {Component} from '@angular/core';
import {TranslatorService} from "./services/translator.service";
import {SettingsService} from "./services/settings.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'sistemkoin2';

    constructor(
        public translator: TranslatorService,
        public settings: SettingsService) {

    }
}
