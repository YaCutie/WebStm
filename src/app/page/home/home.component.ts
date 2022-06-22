import {Component, Inject, Input, OnInit} from '@angular/core';
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
  @Input()
  userid:any;
  @Input()
  token:any;

  constructor(@Inject(Router) router: Router, @Inject(ActivatedRoute) route: ActivatedRoute) {
    this.routing = router;
    this.route = route;
  }

  ngOnInit(): void {
    if (this.userid == 0){
      this.routing.navigate(['/login']);
    }
  }
}
