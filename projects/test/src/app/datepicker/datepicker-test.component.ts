import {Component, ElementRef} from '@angular/core';
import moment, {Moment} from "moment";
import {DateRange, hexToRgb} from "angular-persian-datepicker";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.sass']
})
export class DatepickerTestComponent {
  darkMode: boolean = false
  public primaryColor = '#1546c0'

  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'
  calendarMode: 'normal' | 'datepicker' | 'date-range-picker' = 'date-range-picker'

  format: any = 'YYYY/MM/DD';

  selectedDate: any
  selectedStartDate!: Moment
  selectedEndDate!: Moment

  constructor(private readonly element: ElementRef) {
    this.onColorChanges(this.primaryColor)
  }

  onDateChange(value: string) {
    this.selectedDate = moment(value).format(this.format)
  }

  onDateFormatChange(value: string) {
    this.format = value
    this.selectedDate = moment(this.selectedDate).format(this.format)
  }

  onColorChanges(color: string) {
    this.primaryColor = color
    this.element.nativeElement.style.setProperty('--color-primary', hexToRgb(color));
  }

  onDateSelect(date: Moment) {
    this.selectedDate = date.format(this.format)
  }

  onDateRangeSelect(data: DateRange) {
    this.selectedStartDate = data.startDate
    this.selectedEndDate = data.endDate
  }
}
