import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Schedule} from "../../../model/schedule";
import {Card} from "../../../model/card";
import {Client} from "../../../model/Client";

import {select, Store} from "@ngrx/store";
import {UserState} from "../../../store/user.reducer";
import {Observable} from "rxjs";
import {userSelector} from "../../../store/user.selector";
import {UserSyncStorageService} from "../../../service/user-sync-storage.service";
import axios from "axios";
import {ScheduleDialogComponent} from "../schedule-dialog/schedule-dialog.component";
import {Service} from "../../../model/service";
import {MatInput} from "@angular/material/input";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-newapplication-dialog',
  templateUrl: './newapplication-dialog.component.html',
  styleUrls: ['./newapplication-dialog.component.css']
})
export class NewapplicationDialogComponent implements OnInit {

  DateApp: any;
  day: any;
  schedule: any;
  matDatepicker: any;
  scheduleTime: number[] = [];
  selected: any;

  // @ts-ignore
  timeControl = new FormControl<String | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  appointmentTime:String[] = []

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: any;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: {services:Service[], schedules: Schedule[], client: Client}) {
  }

  async ngOnInit() {
    console.log(this.data.services);
    console.log(this.data.schedules);
    console.log(this.data.client);
  }
  resetForm() {
    this.fromInput.value = '';
  }

  async OnDateChange(date: unknown) {
    this.schedule = null
    this.DateApp = date
    var day = this.DateApp.getDate();
    var monthIndex = this.DateApp.getMonth() + 1;
    var year = this.DateApp.getFullYear();

    if (monthIndex < 10) {
      this.DateApp = year + '-0' + monthIndex;
    } else {
      this.DateApp = year + '-' + monthIndex;
    }
    if (day < 10) {
      this.DateApp += '-0' + day;
    } else {
      this.DateApp += '-' + day;
    }
    this.TimeBoxSet()
  }

  async TimeBoxSet(){
    if (new Date(this.DateApp)<new Date())
    {
      alert("На этот день запись недоступна")
      return null;
    }
    this.day = new Date(this.DateApp).getDay()

    for (let i = 0; i < this.data.schedules.length; i += 1)
    {
      if (this.day == this.data.schedules[i].day-1)
      {
        this.schedule = this.data.schedules[i]
      }
    }
    if (this.schedule == null)
    {
      alert("В этот день данный врач не работает")
      this.resetForm()
      return null;
    }

    let i = 0;
    for(let hour=this.schedule.starttime[0]; hour < this.schedule.stoptime[0]; hour+= this.schedule.durationofreception[0])
    {
      this.scheduleTime[i] = hour;
      i++;
    }

    for(let j=0; j < this.scheduleTime.length; j+= 1)
    {
      this.appointmentTime[j] = this.scheduleTime[j] + ":00"
      i++;
    }
    return null;
  }

  async AddApp(){

  }
}
