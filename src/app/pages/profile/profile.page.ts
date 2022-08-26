import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  annoucements = [
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' }
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
