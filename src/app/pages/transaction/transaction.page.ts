import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss']
})
export class TransactionPage implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];

  constructor(public router: Router) {}

  ngOnInit() {}
}
