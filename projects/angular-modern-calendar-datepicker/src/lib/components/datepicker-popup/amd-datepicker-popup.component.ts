import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Moment} from "moment";
import {DateRange} from "../../models/date-range";
import {CalendarType} from "../../models/calendar-type";
import {CalendarMode} from "../../models/calendar-mode";

@Component({
  selector: 'amd-datepicker-popup',
  templateUrl: './amd-datepicker-popup.component.html',
  styleUrls: ['./amd-datepicker-popup.component.sass']
})
export class AmdDatepickerPopupComponent implements OnInit {
  @Input() positionTop!: number
  @Input() positionBottom!: number
  @Input() positionLeft!: number
  @Input() positionRight!: number
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

  @HostBinding('style.top.px') public top!: string
  @HostBinding('style.bottom.px') public bottom!: string
  @HostBinding('style.left.px') public left!: string
  @HostBinding('style.right.px') public right!: string

  ngOnInit() {
    this.top = this.positionTop.toString()
    this.left = this.positionLeft.toString()
    this.right = this.positionRight.toString()
    this.bottom = this.positionBottom.toString()
  }
}
