import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-page',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
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
