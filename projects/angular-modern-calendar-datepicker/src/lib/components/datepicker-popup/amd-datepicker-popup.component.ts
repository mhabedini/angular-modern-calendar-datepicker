import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Moment} from "moment";
import {DateRange} from "../../models/date-range";
import {CalendarType} from "../../models/calendar-type";
import {CalendarMode} from "../../models/calendar-mode";
import {AmdDatepickerComponent} from "../datepicker/amd-datepicker.component";

@Component({
  selector: 'amd-datepicker-popup',
  templateUrl: './amd-datepicker-popup.component.html',
  styleUrls: ['./amd-datepicker-popup.component.sass'],
  standalone: true,
  imports: [CommonModule, AmdDatepickerComponent]
})
export class AmdDatepickerPopupComponent implements AfterViewInit {

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

  @ViewChild(AmdDatepickerComponent) childComponent!: AmdDatepickerComponent;
  ngAfterViewInit() {
    this.childComponent.changeStyle({
      top: this.positionTop?.toString(),
      bottom: this.positionBottom?.toString(),
      right: this.positionRight?.toString(),
      left: this.positionLeft?.toString()
    });
  }
}
