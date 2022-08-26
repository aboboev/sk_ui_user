import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-page',
  templateUrl: './level.page.html',
  styleUrls: ['./level.page.scss']
})
export class LevelPage implements OnInit {
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
