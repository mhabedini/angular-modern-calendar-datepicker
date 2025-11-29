import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiScrollModule} from "ngx-ui-scroll";
import moment, {Moment} from "moment";
import {IDatasource} from "ngx-ui-scroll";
import {CalendarDay} from "../../models/calendar-day";
import {DatepickerService} from "../../service/datepicker-service";
import {DatepickerFactory} from "../../datepicker/datepicker-factory";
import {hexToRgb} from "../../helper/color-helper";
import {DateRange} from "../../models/date-range";
import {CalendarType} from "../../models/calendar-type";
import {CalendarMode} from "../../models/calendar-mode";


@Component({
  selector: 'amd-datepicker',
  templateUrl: './amd-datepicker.component.html',
  styleUrls: ['./amd-datepicker.component.sass', '../../../../styles.css',],
  standalone: true,
  imports: [CommonModule, UiScrollModule]
})
export class AmdDatepickerComponent implements OnInit, OnChanges {
  @Input() darkMode: boolean = false
  @Input() primaryColor = '#38b0ac'
  @Input() calendarType: CalendarType = CalendarType.JALALI
  @Input() calendarMode: CalendarMode = CalendarMode.DATEPICKER
  @Input() containerStyle!: string
  @Input() min!: Moment
  @Input() max!: Moment

  @Input() isPastDisabled: boolean = false
  @Input() showMonthOutOfRangeDays: boolean = false


  @Output() onDateSelect: EventEmitter<Moment> = new EventEmitter<Moment>()
  @Output() onDateRangeSelect: EventEmitter<DateRange> = new EventEmitter<DateRange>()

  @Input() date!: Moment | undefined
  @Input() dateRange!: DateRange

  yesterday = moment().subtract(1, 'day')
  selectedDate!: Moment | undefined
  selectedStartDate!: any
  selectedEndDate!: any

  hoveredDay: any

  datasource!: IDatasource
  format: any = 'YYYY/MM/DD';
  calendarSelectorMode: "date" | "month" | "year" = "date"
  dates!: CalendarDay[][]
  dateService!: DatepickerService

  protected readonly moment = moment;

  constructor(private readonly element: ElementRef) {
    setTimeout(() => {
      this.yesterday = moment().subtract(1, 'day')
    }, 60000)
  }

  ngOnInit() {
    if (this.date) {
      this.date.startOf('day').set({hour: 12})
    }
    let date;
    if (this.dateRange) {
      this.selectedStartDate = this.dateRange.startDate
      this.selectedEndDate = this.dateRange.endDate
      date = this.dateRange.startDate.toDate()
    } else if (this.date) {
      this.selectedDate = this.date
      date = this.date.toDate()
    } else {
      date = new Date()
    }
    this.loadCalendar(date);
    this.onColorChanges(this.primaryColor)
  }

  onPreviousMonthClick() {
    this.loadCalendar(moment(this.dates[1][1].date).subtract(1, 'month'))
  }

  onNextMonthClick() {
    this.loadCalendar(moment(this.dates[1][1].date).add(1, 'month'))
  }

  loadCalendar(date: Moment | Date) {
    this.dateService = new DatepickerService(date, DatepickerFactory.create(this.calendarType));
    this.dates = this.dateService.calendar()
    this.scrollToYear()
  }

  onColorChanges(color: string) {
    this.element.nativeElement.style.setProperty('--color-primary', hexToRgb(color));
  }

  onGoToTodayClick() {
    const now = moment()
    this.loadCalendar(now)
  }

  changeCurrentMonth(month: number) {
    const date = this.dateService.parseLocalDate(this.dateService.currentYear, month, 15)
    this.loadCalendar(date)
    this.calendarSelectorMode = 'date'
  }


  changeCurrentYear(year: number) {
    const date = this.dateService.parseLocalDate(year, this.dateService.currentMonth, 15)
    this.loadCalendar(date)
    this.calendarSelectorMode = 'month'
  }

  scrollToYear() {
    this.scrollToIndex(Math.floor(this.dateService.currentYear / 4) - 2)
  }

  onMonthToggle() {
    this.calendarSelectorMode = this.calendarSelectorMode === 'month' ? 'date' : 'month'
  }

  onYearToggle() {
    this.calendarSelectorMode = this.calendarSelectorMode === 'year' ? 'date' : 'year'
  }

  scrollToIndex(index: number) {
    this.datasource = {
      get: (index, count, success) => {
        const data = [];
        for (let i = index; i <= index + count - 1; i++) {
          data.push(i);
        }
        success(data);
      },
      settings: {
        minIndex: 0,
        startIndex: index,
      },
    };
  }

  range(from: number, to: number, step: number) {
    return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['calendarType']) {
      this.calendarType = changes['calendarType'].currentValue
      this.loadCalendar(new Date())
    }

    if (changes['primaryColor']) {
      this.onColorChanges(changes['primaryColor'].currentValue)
    }

    if (changes['calendarMode']) {
      this.resetVariables()
    }
  }

  onNewDateSelect(date: CalendarDay) {
    if (this.isPastDisabled && date.date.isBefore(this.yesterday)) {
      return;
    }

    if (this.min && date.date.isBefore(this.min)) {
      return;
    }

    if (this.max && date.date.isAfter(this.max)) {
      return;
    }

    if (!date.isForCurrentMonth) {
      return;
    }

    if (this.calendarMode === 'normal') {
      return;
    }

    const selectedDate = date.date

    if (this.calendarMode === 'datepicker') {
      this.selectedDate = selectedDate
      this.onDateSelect.emit(selectedDate)
      return;
    }

    if (this.calendarMode === 'date-range-picker') {
      if (this.selectedStartDate === undefined || this.selectedEndDate !== undefined || date.date.isBefore(this.selectedStartDate)) {
        this.selectedStartDate = selectedDate
        this.selectedEndDate = undefined
      } else {
        this.selectedEndDate = selectedDate
        this.onDateRangeSelect.emit({
          startDate: this.selectedStartDate,
          endDate: this.selectedEndDate
        });
      }
    }
  }

  private resetVariables() {
    this.selectedEndDate = undefined
    this.selectedStartDate = undefined
    this.selectedDate = undefined
  }
  childStyle = {}
  changeStyle(newStyle: { top?: string; bottom?: string, right?: string, left?: string }) {
    this.childStyle = { ...this.childStyle, ...newStyle };
  }

  protected readonly CalendarType = CalendarType;
  protected readonly CalendarMode = CalendarMode;
}
