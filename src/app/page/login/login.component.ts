import {Component, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login = "";
  password = "";

  bol = true;

  validToken: string | undefined;

  activate: boolean = false;
  routing: Router;
  route: ActivatedRoute;

  constructor(@Inject(Router) router: Router, @Inject(ActivatedRoute) route: ActivatedRoute) {
    this.routing = router;
    this.route = route;
    //this.login = this.route.snapshot.paramMap.get('login');
  }


  ngOnInit(): void {
  }

  public onLogin() {

    const config = {
      url: "http://localhost:8080/user/login",
    };
    this.bol = false;
    const data = {
      login: this.login,
      password: this.password
    };
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
    };
    console.log(this.login, this.password)
    axios
      .post(config.url, data, { headers })
      .then((response) => {
        console.log(response.data);
        if (response.data.verification) {
          this.validToken = response.data.token;
          alert("Вход прошёл успешно!");
          this.bol = false;
          this.routing.navigate(['clientpage'])
        } else {
          alert("Неверный логин или пароль!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Неверный логин или пароль!");
      });
    console.log(this.bol)
  }

  onFind() {

    const config = {
      url: "http://localhost:8080/user/find",
    };
    this.bol = false;
    const data = {
      id:3
    };
    const headers = {
      "Content-Type": "application/json",
      "x-mock-match-request-body": "true",
      'Authorization': 'Bearer ' + this.validToken,
    };
    axios
      .post(config.url, data, { headers })
      .then((response) => {
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("Ошибка");
      });
    console.log(this.bol)
  }
}
