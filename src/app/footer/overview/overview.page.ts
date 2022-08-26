import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-termsandconditions-page',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OverviewPage implements OnInit {
    constructor(public router: Router) {
    }

    ngOnInit() {
    }
}
