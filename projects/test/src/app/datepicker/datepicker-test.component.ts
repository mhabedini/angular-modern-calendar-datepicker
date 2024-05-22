import {Component, ElementRef} from '@angular/core';
import moment from "moment";
import {hexToRgb} from "angular-persian-datepicker";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.sass']
})
export class DatepickerTestComponent {
  darkMode: boolean = false
  public primaryColor = '#38b0ac'
  public primaryColorChange = ''

  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'
  calendarMode: 'normal' | 'datepicker' | 'date-range-picker' = 'normal'

  format: any = 'YYYY/MM/DD';

  selectedDate: any

  constructor(private readonly element: ElementRef) {
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

  onCalendarTypeChange(type: any) {
    this.calendarType = type
  }

  onCalendarModeChange(mode: any) {
    this.calendarMode = mode
  }

  onDateSelect(date: moment.Moment) {
    this.selectedDate = date.format(this.format)
  }
}
