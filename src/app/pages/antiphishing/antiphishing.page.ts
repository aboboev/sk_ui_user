import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-antiphishing-page',
  templateUrl: './antiphishing.page.html',
  styleUrls: ['./antiphishing.page.scss']
})
export class AntiPhishingPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
