import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit, AfterViewInit {
  telegramCount = 3000;
  constructor(public router: Router, public translate: TranslateService) {
    if (!translate.getDefaultLang()) translate.setDefaultLang('en_US');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    $('#phone').intlTelInput({
      placeholderNumberType: 'MOBILE',
      preferredCountries: ['tr'],
      separateDialCode: true,
      utilsScript: 'assets/js/utils.js'
    });

    $('.intl-tel-input').width('100%');
  }
}
