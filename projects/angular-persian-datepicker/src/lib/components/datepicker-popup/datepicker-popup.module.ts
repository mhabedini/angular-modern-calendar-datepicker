import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerPopupComponent } from './datepicker-popup.component';
import {DatepickerModule} from "../datepicker/datepicker.module";
import {ApdDatepickerPopupModule} from "../../directives/dpd-datepicker-directive.module";



@NgModule({
  declarations: [
    DatepickerPopupComponent
  ],
  imports: [
    CommonModule,
    DatepickerModule,
    ApdDatepickerPopupModule
  ],
  exports: [DatepickerPopupComponent]
})
export class DatepickerPopupModule { }
