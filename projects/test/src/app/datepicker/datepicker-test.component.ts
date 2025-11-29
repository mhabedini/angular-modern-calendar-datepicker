import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {AmdDatepickerComponent, AmdDatepickerDirective} from "angular-modern-calendar-datepicker";
import moment, {Moment} from "moment";
import {DateRange} from "angular-modern-calendar-datepicker";
import {CalendarType} from "../../../../angular-modern-calendar-datepicker/src/lib/models/calendar-type";
import {CalendarMode} from "../../../../angular-modern-calendar-datepicker/src/lib/models/calendar-mode";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ColorPickerModule, AmdDatepickerComponent, AmdDatepickerDirective]
})
export class DatepickerTestComponent {
  darkMode: boolean = false
  public primaryColor = '#1546c0'

  showMonthOutOfRangeDays: boolean = false
  isPastDisabled: boolean = false

  calendarType: CalendarType = CalendarType.JALALI
  calendarMode: CalendarMode = CalendarMode.DATEPICKER

  min!: Moment
  max!: Moment

  format: any = 'YYYY/MM/DD';


  form = new FormGroup({
    date: new FormControl(moment().format('YYYY/MM/DD'))
  })

  selectedDate: any
  selectedStartDate!: Moment
  selectedEndDate!: Moment

  constructor() {
    this.onColorChanges(this.primaryColor)

    this.form.valueChanges.subscribe(value => {
      console.log(value)
    })
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
  protected readonly moment = moment;
}
