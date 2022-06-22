import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {tokenSelector, userSelector} from "../store/user.selector";
import {UserState} from "../store/user.reducer";
import {UserSyncStorageService} from "../service/user-sync-storage.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  constructor( private store$: Store<UserState>,
               private userSyncStorage: UserSyncStorageService) { }

  public bol = true;

  userId: Observable<number> = this.store$.pipe(select(userSelector));
  token: Observable<string> = this.store$.pipe(select(tokenSelector));

  ngOnInit(): void {
    this.userSyncStorage.init();
  }

}
