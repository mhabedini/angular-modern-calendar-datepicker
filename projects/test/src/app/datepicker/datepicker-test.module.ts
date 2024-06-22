import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerTestComponent} from './datepicker-test.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {AmdDatepickerDirectiveModule, AmdDatepickerModule} from "angular-modern-calendar-datepicker";

@NgModule({
  declarations: [
    DatepickerTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    AmdDatepickerDirectiveModule,
    AmdDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class DatepickerTestModule {
}
