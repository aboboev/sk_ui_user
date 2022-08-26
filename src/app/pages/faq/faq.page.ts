import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss']
})
export class FAQPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
