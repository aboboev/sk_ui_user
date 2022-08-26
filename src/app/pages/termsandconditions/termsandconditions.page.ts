import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termsandconditions-page',
  templateUrl: './termsandconditions.page.html',
  styleUrls: ['./termsandconditions.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TermsAndConditionsPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
