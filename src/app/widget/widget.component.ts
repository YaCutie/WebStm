import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  constructor() { }

  public bol = true;

  add() {
    console.log(this.bol)
  }

  ngOnInit(): void {
  }

}
