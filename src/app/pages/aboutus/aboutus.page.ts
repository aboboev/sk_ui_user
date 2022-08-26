import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
