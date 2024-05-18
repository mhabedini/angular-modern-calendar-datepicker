import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";



@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
  ],
})
export class DatepickerModule { }
