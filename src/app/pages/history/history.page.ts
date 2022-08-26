import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-page',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
  annoucements = [
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' },
    { title: 'Sistemkoin Lists Ardor (ARDR)', date: '28/07/2018' }
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
