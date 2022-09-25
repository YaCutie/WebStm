import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoginAction, UserLogoutAction} from "../../store/user.action";
import {UserState} from "../../store/user.reducer";
import {Store} from "@ngrx/store";
import {UserSyncStorageService} from "../../service/user-sync-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login = "";
  password = "";
  id: any;
  bol = true;

  token: any;
  activate: boolean = false;
  routing: Router;
  route: ActivatedRoute;

  constructor(@Inject(Router) router: Router,private store$: Store<UserState>, @Inject(ActivatedRoute) route: ActivatedRoute,
              private userSyncStorage: UserSyncStorageService) {
    this.routing = router;
    this.route = route;
  }

  logoutEmmit = new EventEmitter<number>();
  tokenEmmit = new EventEmitter<string>();
  loginEmmit = new EventEmitter<number>();

  ngOnInit(): void {
    this.userSyncStorage.init();
    this.logoutEmmit = new EventEmitter<number>();
    this.onLogoutDispatch(0)
  }

  onLogin() {
    this.tokenEmmit.emit(this.token);
    this.loginEmmit.emit(this.id);
    this.onLoginDispatch(this.id, this.token);
  }
  onLoginDispatch(id: number, token: string) {
    this.store$.dispatch(new UserLoginAction({id, token}))
  }
  onLogoutDispatch(id: number) {
    this.store$.dispatch(new UserLogoutAction({id}))
  }

  public Login() {


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
    axios
      .post(config.url, data, { headers })
      .then((response) => {
        if (response.data.verification) {
          // this.token = response.data.token;
          alert("Вход прошёл успешно!");
          this.bol = false;
          this.id = response.data.id;
          this.onLogin();
          this.routing.navigate(['clientpage'])
        } else {
          alert("Неверный логин или пароль!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Неверный логин или пароль!");
      });
  }
}
