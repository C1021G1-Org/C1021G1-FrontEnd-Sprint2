import { Component, OnInit } from '@angular/core';
declare var WOW;
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.wow();
  }
  wow() {
    new WOW().init();
  }
}
