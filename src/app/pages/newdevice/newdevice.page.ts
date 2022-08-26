import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newdevice-page',
  templateUrl: './newdevice.page.html',
  styleUrls: ['./newdevice.page.scss']
})
export class NewDevicePage implements OnInit {
  telegramCount = 3000;
  constructor(public router: Router, public translate: TranslateService) {
    if (!translate.getDefaultLang()) translate.setDefaultLang('en_US');
  }

  ngOnInit() {}

  buyNow() {}
}
