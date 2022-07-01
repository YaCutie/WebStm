import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Service} from "../../../model/service";

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})

export class ServiceDialogComponent {

  displayedColumns = ["serviceName", "price"];
  dataSource : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Service[]) {
    this.dataSource = data;
  }

  ngOnInit(): void {
  }

}

