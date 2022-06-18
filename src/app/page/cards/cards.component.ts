import {Component, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {Card} from "../../model/card";
import {Service} from "../../model/service";
import {MatDialog} from "@angular/material/dialog";
import {ServiceDialogComponent} from "./service-dialog/service-dialog.component";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  cards: Card[] = [];
  services: Service[]=[];
  @Input()
  userid: any;
  pagedList: Card[] = [];
  cardLength: any;
  pageSize = 3;
  router: Router;

  constructor(@Inject(Router) router: Router,public dialog: MatDialog) {
    this.router = router;
  }

  ngOnInit() {
    this.LoadCards();
  }

  async LoadCards() {
    const config = {
      url: "http://localhost:8080/personal/findall",
    };
    await axios.get(config.url).then((response) => {
        this.cards = response.data;
        this.cardLength = this.cards.length;
        this.pagedList = this.cards.slice(0, this.pageSize)
        console.log(this.cards);
      }
    )
  }

  onPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex  + event.pageSize;
    if(endIndex < startIndex) {
      endIndex = this.cardLength;
    }
    this.pagedList = this.cards.slice(startIndex, endIndex)
  }

  async AllServices(id: number) {
    const config = {
      url: "http://localhost:8080/personal/findallservices",
    };
    await axios.post(config.url, {id}).then((response) => {
        this.services = response.data;
      }
    )
    this.dialog.open(ServiceDialogComponent,{
      data: this.services,
    });
  }
}

