import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input"
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatCheckboxModule],
  exports: [MatButtonModule, MatInputModule, MatCheckboxModule]
})
export class MaterialAppModule { }
