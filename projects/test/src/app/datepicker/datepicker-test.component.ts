import {Component} from '@angular/core';
import moment, {Moment} from "moment";
import {DateRange} from "angular-modern-calendar-datepicker";
import {CalendarType} from "../../../../angular-modern-calendar-datepicker/src/lib/models/calendar-type";
import {CalendarMode} from "../../../../angular-modern-calendar-datepicker/src/lib/models/calendar-mode";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.sass']
})
export class DatepickerTestComponent {
  darkMode: boolean = false
  public primaryColor = '#1546c0'

  showMonthOutOfRangeDays: boolean = false
  isPastDisabled: boolean = false

  calendarType: CalendarType = CalendarType.JALALI
  calendarMode: CalendarMode = CalendarMode.DATE_RANGE_PICKER

  min!: Moment
  max!: Moment

  format: any = 'YYYY/MM/DD';

  selectedDate: any
  selectedStartDate!: Moment
  selectedEndDate!: Moment

  constructor() {
    this.onColorChanges(this.primaryColor)
  }

  onDateFormatChange(value: string) {
    this.format = value
    this.selectedDate = moment(this.selectedDate).format(this.format)
  }

  onColorChanges(color: string) {
    this.primaryColor = color
  }

  onDateSelect(date: Moment) {
    this.selectedDate = date.format(this.format)
  }

  onDateRangeSelect(data: DateRange) {
    this.selectedStartDate = data.startDate
    this.selectedEndDate = data.endDate
  }

  protected readonly CalendarMode = CalendarMode;
}
