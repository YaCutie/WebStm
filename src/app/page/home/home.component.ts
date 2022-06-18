import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  NewApplication() {
    this.routing.navigate(['newapplication'])
  }
}
