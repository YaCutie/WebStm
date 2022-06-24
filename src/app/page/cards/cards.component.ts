import {Component, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {Card} from "../../model/card";
import {Service} from "../../model/service";
import {MatDialog} from "@angular/material/dialog";
import {ServiceDialogComponent} from "./service-dialog/service-dialog.component";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {Schedule} from "../../model/schedule";
import {NewapplicationDialogComponent} from "./newapplication-dialog/newapplication-dialog.component";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {userSelector} from "../../store/user.selector";
import {UserState} from "../../store/user.reducer";
import {UserSyncStorageService} from "../../service/user-sync-storage.service";
import {consolidateMessages} from "@angular/localize/tools/src/extract/translation_files/utils";
import {Appointment} from "../../model/appointment";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  cards: Card[] = [];
  services: Service[]=[];
  schedules: Schedule[]=[];
  client: any;
  @Input()
  userid: any;
  @Input()
  token:any;
  pagedList: Card[] = [];
  cardLength: any;
  pageSize = 3;
  router: Router;
  allAppointment: Appointment[] = [];

  constructor(@Inject(Router) router: Router, public dialog: MatDialog) {
    this.router = router;
  }

  ngOnInit() {
    console.log(this.token)
    console.log(this.userid)

    this.LoadCards();
    this.FindAppointment();
  }

  async LoadCards() {
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
    };
    const config = {
      url: "http://localhost:8080/personal/findall",
    };
    await axios.get(config.url, {headers}).then((response) => {
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
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
    };
    const config = {
      url: "http://localhost:8080/personal/findallservices",
    };
    await axios.post(config.url, {id}, {headers}).then((response) => {
        this.services = response.data;
      }
    )
    this.dialog.open(ServiceDialogComponent,{
      data: this.services,
    });
  }

  async Schedule(id: number) {
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
    };
    const config = {
      url: "http://localhost:8080/personal/findallschedule",
    };
    await axios.post(config.url, {id}, {headers}).then((response) => {
        this.schedules = response.data;
      }
    )
    this.dialog.open(ScheduleDialogComponent,{
      data: this.schedules,
    });
  }

  async NewApp(cardid: number, id: number) {
    if (this.allAppointment.length>0){
      alert("Вы уже записаны к врачу!")
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
    };
    const config1 = {
      url: "http://localhost:8080/personal/findallschedule",
    };
    await axios.post(config1.url, {id}, { headers } ).then((response) => {
        this.schedules = response.data;
      }
    );
    const config2 = {
      url: "http://localhost:8080/personal/findallservices",
    };
    await axios.post(config2.url, {id}, {headers}).then((response) => {
        this.services = response.data;
      }
    );
    const config = {
      url: "http://localhost:8080/user/find",
    };
    await axios.post(config.url, {id: this.userid}, { headers }).then((response) => {
        this.client = response.data.рўlient;
        console.log(this.client)
        let age = this.getAge(this.client.dateOfBirth[0] + "-" + this.client.dateOfBirth[1] + "-" + this.client.dateOfBirth[2])

        if (age <= 14 && this.cards[cardid].specializationid.id == 1) {
          console.log("Го малышь");
          this.dialog.open(NewapplicationDialogComponent, {
            data: {card: this.cards[cardid], services: this.services, schedules: this.schedules, client: this.client, token: this.token}
          });
        }
        else if (age >= 14 && this.cards[cardid].specializationid.id == 2) {
          console.log("Го большой");
          this.dialog.open(NewapplicationDialogComponent, {
            data: {card: this.cards[cardid], services: this.services, schedules: this.schedules, client: this.client, token: this.token}
          });
        }
        else {
          alert("Вам не подходит этот врач")
        }
      }
    )
  }

  async FindAppointment() {
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
    };
    const config1 = {
      url: "http://localhost:8080/user/allappointment",
    };
    await axios.post(config1.url, {id: this.userid}, {headers}).then((response) => {
        this.allAppointment = response.data;
      }
    );
  }

  getAge(date: string) {
    // @ts-ignore
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
  }
}
