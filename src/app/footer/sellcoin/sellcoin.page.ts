import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-termsandconditions-page',
    templateUrl: './sellcoin.page.html',
    styleUrls: ['./sellcoin.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SellcoinPage implements OnInit {
    constructor(public router: Router) {
    }

    ngOnInit() {
    }
}
