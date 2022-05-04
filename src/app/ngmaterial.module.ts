import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input"
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatCheckboxModule],
  exports: [MatButtonModule, MatInputModule, MatCheckboxModule]
})
export class MaterialAppModule { }
