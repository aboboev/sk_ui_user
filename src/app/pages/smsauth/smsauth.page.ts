import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-smsauth-page',
  templateUrl: './smsauth.page.html',
  styleUrls: ['./smsauth.page.scss']
})
export class SMSAuthPage implements OnInit, AfterViewInit {
  constructor(public router: Router) {}

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
