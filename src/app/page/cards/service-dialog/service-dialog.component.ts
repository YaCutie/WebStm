import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {service:{servicesName:string, price:number}}) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}

