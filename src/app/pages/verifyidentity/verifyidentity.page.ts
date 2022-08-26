import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyidentity-page',
  templateUrl: './verifyidentity.page.html',
  styleUrls: ['./verifyidentity.page.scss']
})
export class VerifyIdentityPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
