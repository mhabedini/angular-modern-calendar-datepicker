import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Moment} from "moment";
import {DateRange} from "../../models/date-range";
import {CalendarType} from "../../models/calendar-type";
import {CalendarMode} from "../../models/calendar-mode";

@Component({
  selector: 'amd-datepicker-popup',
  templateUrl: './amd-datepicker-popup.component.html',
  styleUrls: ['./amd-datepicker-popup.component.sass']
})
export class AmdDatepickerPopupComponent {
  @Input() top!: number
  @Input() bottom!: number
  @Input() left!: number
  @Input() right!: number
  @Input() id!: number
  @Input() darkMode: boolean = false
  @Input() primaryColor = '#38b0ac'
  @Input() min!: Moment
  @Input() max!: Moment

  @Input() isPastDisabled: boolean = false
  @Input() showMonthOutOfRangeDays: boolean = false

  @Input() calendarType: CalendarType = CalendarType.JALALI
  @Input() calendarMode: CalendarMode = CalendarMode.DATEPICKER

  @Input() date!: Moment | undefined
  @Input() dateRange!: DateRange

  @Output() onDateSelect: EventEmitter<Moment> = new EventEmitter<Moment>()
  @Output() onDateRangeSelect: EventEmitter<DateRange> = new EventEmitter<DateRange>()
}
