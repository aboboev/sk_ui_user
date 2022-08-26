import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawaladdress-page',
  templateUrl: './withdrawaladdress.page.html',
  styleUrls: ['./withdrawaladdress.page.scss']
})
export class WithdrawalAddressPage implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
