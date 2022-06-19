import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {UserState} from "../../store/user.reducer";
import {Observable} from "rxjs";
import {userSelector} from "../../store/user.selector";
import {UserSyncStorageService} from "../../service/user-sync-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activate: boolean = false;
  routing: Router;
  route: ActivatedRoute;


  userId: Observable<number> = this.store$.pipe(select(userSelector));

  constructor(@Inject(Router) router: Router, @Inject(ActivatedRoute) route: ActivatedRoute, private store$: Store<UserState>,
              private userSyncStorage: UserSyncStorageService) {
    this.routing = router;
    this.route = route;
    this.userSyncStorage.init();
  }

  ngOnInit(): void {
  }

  NewApplication() {
    this.routing.navigate(['newapplication'])
  }
}
