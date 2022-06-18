import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './page/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialAppModule} from "./ngmaterial.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {LoginComponent} from "./page/login/login.component";
import {FormsModule} from "@angular/forms";
import {ApplicationComponent} from "./page/application/application.component";
import {UserDataComponent} from "./page/user-data/user-data.component";
import {RegistrationComponent} from "./page/registration/registration.component";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from '@angular/material/core';
import {CardsComponent} from "./page/cards/cards.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '**',
        redirectTo: 'login'
      }
    ]),
    MatNativeDateModule,
    AppRoutingModule,
    MaterialAppModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
