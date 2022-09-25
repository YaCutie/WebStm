import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";
import {Appointment} from "../../model/appointment";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  activate: boolean = false;
  routing: Router;
  route: ActivatedRoute;
  @Input()
  userid: any;
  @Input()
  token: any;
  client: any;
  displayedColumns = ["receptionDate", "receptionTime","clinicid.clinicName", "personalid", "status.statusname"];
  dataSource: any;
  data: Appointment[] = [];
  DoB: any;

  constructor(@Inject(Router) router: Router, @Inject(ActivatedRoute) route: ActivatedRoute) {
    this.routing = router;
    this.route = route;
  }

  ngOnInit(): void {
    this.FindUser();
    this.FindAppointment();
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
        this.data = response.data;
        this.dataSource = this.data;
      }
    );
  }

  async FindUser() {
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.token,
      'Accept-Language': 'en-US,en;q=0.5'
    };
    const config1 = {
      url: "http://localhost:8080/user/find",
    };
    await axios.post(config1.url, {id: this.userid}, {headers}).then((response) => {
        this.client = response.data.client;
        this.DoB = new Date(this.client.dateOfBirth[0] + "-" + this.client.dateOfBirth[1] + "-" + this.client.dateOfBirth[2]).toLocaleDateString()
      }
    );
  }

  onExit() {
    this.routing.navigate(['login'])
  }

  Date(receptionTime: any) {
    let date = new Date(receptionTime ).toLocaleDateString();
    return date;
  }

  Time(receptionTime: any) {
    let date = new Date(receptionTime).toLocaleTimeString()  ;
    return date;
  }
}
