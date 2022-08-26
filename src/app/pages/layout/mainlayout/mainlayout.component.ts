import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainLayoutComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.activeRoute.url.subscribe(e => {
      console.log(e);
    });
    if (!translate.getDefaultLang()) translate.setDefaultLang('en_US');
  }

  useLanguage(lang: string = null) {
    this.translate.use(lang);
  }
}
