import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupemail-page',
  templateUrl: './signupemail.page.html',
  styleUrls: ['./signupemail.page.scss']
})
export class SignupEmailPage implements OnInit {
  telegramCount = 3000;
  constructor(public router: Router, public translate: TranslateService) {
    if (!translate.getDefaultLang()) translate.setDefaultLang('en_US');
  }

  ngOnInit() {}

  buyNow() {}
}
