import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-googleauth-page',
  templateUrl: './googleauth.page.html',
  styleUrls: ['./googleauth.page.scss']
})
export class GoogleAuthPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
