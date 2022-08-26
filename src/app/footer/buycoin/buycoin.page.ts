import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-termsandconditions-page',
    templateUrl: './buycoin.page.html',
    styleUrls: ['./buycoin.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BuycoinPage implements OnInit {
    constructor(public router: Router) {
    }

    ngOnInit() {
    }
}
