import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {WidgetComponent} from "./widget/widget.component";
import {MatTabsModule} from "@angular/material/tabs";
import {LoginComponent} from "./page/login/login.component";
import {RegistrationComponent} from "./page/registration/registration.component";
import {ApplicationComponent} from "./page/application/application.component";
import {UserDataComponent} from "./page/user-data/user-data.component";
import {MaterialAppModule} from "./ngmaterial.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CardsComponent} from "./page/cards/cards.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatStepperModule} from "@angular/material/stepper";
import {ServiceDialogComponent} from "./page/cards/service-dialog/service-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {ScheduleDialogComponent} from "./page/cards/schedule-dialog/schedule-dialog.component";
import {NewapplicationDialogComponent} from "./page/cards/newapplication-dialog/newapplication-dialog.component";
import {MatRadioModule} from "@angular/material/radio";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'clientpage',
    component: WidgetComponent
  },
  {
    path: 'newapplication',
    component: ApplicationComponent
  },
];

@NgModule({
  declarations: [
    WidgetComponent,
    HomeComponent,
    LoginComponent,
    ApplicationComponent,
    RegistrationComponent,
    UserDataComponent,
    CardsComponent,
    ServiceDialogComponent,
    ScheduleDialogComponent,
    NewapplicationDialogComponent,
  ],
  imports: [RouterModule.forRoot(routes), MatTabsModule, MaterialAppModule, FormsModule, CommonModule, MatFormFieldModule, MatDatepickerModule, MatGridListModule, MatCardModule, MatPaginatorModule, MatStepperModule, ReactiveFormsModule, MatTableModule, MatRadioModule],
  exports: [WidgetComponent]
})
export class AppRoutingModule {
}
