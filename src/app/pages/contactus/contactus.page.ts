import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactUsPage implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
