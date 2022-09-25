import {Component, Inject, NgModule, OnInit} from '@angular/core';
import axios from "axios";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {UserSyncStorageService} from "../../service/user-sync-storage.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})

export class RegistrationComponent implements OnInit {
  login: any;
  password: any;
  returnPassword: any;
  email: any;
  surname: any;
  name: any;
  middleName: any;
  phone: any;
  DoB: any;
  bol = true;
  validToken: any;

  activate: boolean = false;
  routing: Router;
  route: ActivatedRoute;


  constructor(@Inject(Router) router: Router, @Inject(ActivatedRoute) route: ActivatedRoute, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private userSyncStorage: UserSyncStorageService) {
    this.routing = router;
    this.route = route;
    this._locale =  'en-GB';
    //this.login = this.route.snapshot.paramMap.get('login');
  }

  ngOnInit(): void {
  }

  OnDateChange(date: unknown) {
    this.DoB = date
    var day = this.DoB.getDate();
    var monthIndex = this.DoB.getMonth()+1;
    var year = this.DoB.getFullYear();

    if (monthIndex<10) {
      this.DoB = year + '-0' + monthIndex;
    }
    else {
      this.DoB = year + '-' + monthIndex;
    }
    if (day<10) {
      this.DoB += '-0' + day;
    }
    else {
      this.DoB +='-' + day;
    }
  }

  onRegistration() {
    const config = {
      url: "http://localhost:8080/user/registration",
    };
    this.bol = false;
    const data = {
      surname: this.surname,
      name: this.name,
      middleName: this.middleName,
      dateOfBirth: this.DoB,
      phone: this.phone,
      email: this.email,
      login: this.login,
      password: this.password
    };
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
    };
    axios
      .post(config.url, data, { headers })
      .then((response) => {
        if (response.data.verification) {
          // this.validToken = response.data.token;
          alert("Регистрация прошла успешно!");
          this.bol = false;
          this.routing.navigate(['login'])
        } else {
          alert("Логин или Email заняты!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Ошибка!");
      });
  }
}
