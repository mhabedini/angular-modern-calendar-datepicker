import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerTestComponent} from './datepicker-test.component';
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {ApdDatepickerPopupModule, DatepickerModule} from "angular-modern-calendar-datepicker";


@NgModule({
    declarations: [
        DatepickerTestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        DatepickerModule,
        ApdDatepickerPopupModule,
    ],
})
export class DatepickerTestModule {
}
