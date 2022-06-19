import {Component, Inject, OnInit} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {Card} from "../../model/card";
import axios from "axios";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ApplicationComponent implements OnInit {
  surname: any;
  name: any;
  middleName: any;
  route: ActivatedRoute;
  routing: Router;
  id: any;
  card : any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(@Inject(Router) router: Router,
              @Inject(ActivatedRoute) route: ActivatedRoute,
              private _formBuilder: FormBuilder) {
    this.routing = router;
    this.route = route;
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit(){
    console.log(this.id);
    const config = {
      url: "http://localhost:8080/personal/findpersonbyid",
    };
    const data = {
      id:this.route.snapshot.paramMap.get('id')
    }
    await axios.post(config.url, data).then((response) => {
        this.card = response.data;
        console.log(this.card);
      }
    )
  }

  onApp(){

  }

  NewApp() {

  }
}
