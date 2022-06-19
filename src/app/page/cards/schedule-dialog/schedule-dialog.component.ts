import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Schedule} from "../../../model/schedule";

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent implements OnInit {

  displayedColumns = ["day","cabinet", "time","durationofreception"];
  dataSource : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Schedule[]) {
    this.dataSource = data;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  getWeekDay(date:any) {
    let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота','Воскресенье'];

    return days[date-1];
  }
}
