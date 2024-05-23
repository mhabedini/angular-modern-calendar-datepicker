import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Moment} from "moment";
import {DateRange} from "../../models/date-range";
import {CalendarType} from "../../models/calendar-type";
import {CalendarMode} from "../../models/calendar-mode";

@Component({
  selector: 'apd-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.sass']
})
export class DatepickerPopupComponent {
  @Input() top!: number
  @Input() left!: number
  @Input() right!: number
  @Input() id!: number
  @Input() darkMode: boolean = false
  @Input() primaryColor = '#38b0ac'

  @Input() calendarType: CalendarType = CalendarType.JALALI
  @Input() calendarMode: CalendarMode = CalendarMode.DATEPICKER

  @Output() onDateSelect: EventEmitter<Moment> = new EventEmitter<Moment>()
  @Output() onDateRangeSelect: EventEmitter<DateRange> = new EventEmitter<DateRange>()
}
