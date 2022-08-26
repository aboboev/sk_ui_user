import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404-page',
  templateUrl: './404.page.html',
  styleUrls: ['./404.page.scss']
})
export class NotFoundPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
