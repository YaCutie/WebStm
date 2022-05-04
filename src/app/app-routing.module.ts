import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {WidgetComponent} from "./widget/widget.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'widget',
    component: WidgetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
