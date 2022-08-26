import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-contactus-page',
    templateUrl: './contactus.page.html',
    styleUrls: ['./contactus.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactUsPage implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }
}
