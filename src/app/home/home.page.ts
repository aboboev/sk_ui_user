import {
    Component,
    OnInit,
    AfterViewInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslatorService} from "../services/translator.service";

declare var $: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, AfterViewInit {
    owlConfig = {
        items: 4,
        navigation: false,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplaySpeed: 7000,
        autoplayHoverPause: true,
        slideTransition: 'linear',
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    };
    tickers = [];

    constructor(public router: Router, public http: HttpClient) {
    }

    ngOnInit() {
        // this.http.get('http://localhost/sistemkoin/api/public/api/market/coin_pair?locale=en').subscribe(res => {
        //     var deger = (<any>res).data;
        //     var text = '';
        //     var paraArray = new Array();
        //     var i;
        //     deger.forEach(value => {
        //         if (value.market_coin == 'TL') {
        //             paraArray.push(value);
        //         }
        //     });
        //
        //     var color;
        //     for (i = 0; i < paraArray.length; i++) {
        //         if (parseFloat(paraArray[i].change) <= 0) {
        //             color = 'text-red';
        //         } else {
        //             color = 'text-green';
        //         }
        //         text =
        //             '<div class="grp-left-text"><h5 class="text-white">' +
        //             paraArray[i].coin +
        //             '/' +
        //             paraArray[i].market_coin +
        //             ' <span class="' +
        //             color +
        //             '">' +
        //             paraArray[i].change +
        //             '%</span></h5><h5>' +
        //             paraArray[i].last_price +
        //             ' <span>' +
        //             paraArray[i].market_coin +
        //             '</span></h5><h6>Volume:<span>' +
        //             paraArray[i].volume +
        //             '</span> ' +
        //             paraArray[i].coin +
        //             '</h6></div>';
        //         this.tickers.push(text);
        //     }
        // });
    }

    ngAfterViewInit() {
    }
}
