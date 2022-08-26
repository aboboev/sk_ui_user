import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword-page',
  templateUrl: './confirmemail.page.html',
  styleUrls: ['./confirmemail.page.scss']
})
export class ConfirmemailPage implements OnInit {
  constructor(public router: Router) {
  }

  ngOnInit() {}

}
