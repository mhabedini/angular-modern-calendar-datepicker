import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import {UiScrollModule} from "ngx-ui-scroll";



@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    UiScrollModule
  ],
  exports: [DatepickerComponent]
})
export class DatepickerModule { }
