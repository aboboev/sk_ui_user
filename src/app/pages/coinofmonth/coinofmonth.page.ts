import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coinofmonth-page',
  templateUrl: './coinofmonth.page.html',
  styleUrls: ['./coinofmonth.page.scss']
})
export class CoinOfMonthPage implements OnInit {
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
