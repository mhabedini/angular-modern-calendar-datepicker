import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerTestComponent} from './datepicker-test.component';
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {DatepickerModule} from "angular-persian-datepicker";


@NgModule({
    declarations: [
        DatepickerTestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        DatepickerModule
    ],
})
export class DatepickerTestModule {
}
