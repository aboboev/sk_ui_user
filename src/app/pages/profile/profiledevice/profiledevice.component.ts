import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiledevice-component',
  templateUrl: './profiledevice.component.html',
  styleUrls: ['./profiledevice.component.scss']
})
export class ProfileDeviceComponent implements OnInit {
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
