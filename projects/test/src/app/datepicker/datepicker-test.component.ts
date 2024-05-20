import {Component} from '@angular/core';
import * as moment from "moment";
import {DatepickerService} from "../../../../angular-persian-datepicker/src/lib/service/datepicker-service";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker-test.component.html',
    styleUrls: ['./datepicker-test.component.sass']
})
export class DatepickerTestComponent {
    darkMode: boolean = false
    primaryColor = '#38b0ac'
    calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'
    format: any = 'YYYY/MM/DD';

    selectedDate: any
    dateService!: DatepickerService

    onDateChange(value: string) {
        this.selectedDate = moment(value).format(this.format)
    }

    onDateFormatChange(value: string) {
        this.format = value
        this.selectedDate = moment(this.selectedDate).format(this.format)
    }

    onColorChanges(color: string) {
        this.primaryColor = color
    }

    onCalendarTypeChange(type: any) {
        this.calendarType = type
    }
}
