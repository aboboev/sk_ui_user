import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword-page',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss']
})
export class ChangePasswordPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
