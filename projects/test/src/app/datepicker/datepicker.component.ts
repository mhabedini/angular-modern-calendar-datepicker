import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";
import {GregorianDateService} from "../../../../angular-persian-datepicker/src/lib/service/gregorian-date-service";
import {HijriDateService} from "../../../../angular-persian-datepicker/src/lib/service/hijri-date-service";
import {DateServiceInterface} from "../../../../angular-persian-datepicker/src/lib/service/date-service-interface";
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import {hexToRgb} from "../../../../angular-persian-datepicker/src/lib/helper/color-helper";
import {IDatasource} from "ngx-ui-scroll";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent implements OnInit {
  @Input() darkMode: boolean = false
  @Input() primaryColor = '#38b0ac'
  @Input() calendarType: 'jalali' | 'gregorian' | 'hijri' | string = 'jalali'
  @Input() format: any = 'YYYY/MM/DD';

  calendarMode: "date" | "month" | "year" = "date"

  selectedDate: any
  dates!: any
  currentYear!: any
  currentMonth: any
  dateService!: DateServiceInterface

  range = (from: number, to: number, step: number) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);


  constructor(private readonly element: ElementRef) {
    this.dateService = new JalaliDateService()
    this.loadData(moment())
    this.onColorChanges(this.primaryColor)
  }

  ngOnInit() {
    this.selectedDate = moment().format('YYYY/MM/DD')
    this.scrollToIndex(Math.floor(parseInt(this.currentYear) / 4) - 2)
  }

  onPreviousMonthClick() {
    this.loadData(this.dates[1][6].gDate.subtract(1, 'month'))
  }

  onNextMonthClick() {
    this.loadData(this.dates[1][6].gDate.add(1, 'month'))
  }

  loadData(date: Moment) {
    this.dates = this.dateService.daysInMonth(date.format('YYYY/MM/DD'))
    this.currentYear = this.dateService.getCurrentYear(this.dates[1][6].date)
    this.currentMonth = this.dateService.getCurrentMonth(this.dates[1][6].date)
  }

  onDateChange(value: string) {
    this.loadData(moment(value))
    this.selectedDate = moment(value).format(this.format)
  }

  onDateFormatChange(value: string) {
    this.format = value
    this.selectedDate = moment(this.selectedDate).format(this.format)
  }

  onCalendarTypeChange(type: string) {
    this.calendarType = type
    if (type === 'jalali') {
      this.dateService = new JalaliDateService();
      this.loadData(moment())
    } else if (type === 'gregorian') {
      this.dateService = new GregorianDateService();
      this.loadData(moment())
    } else if (type === 'hijri') {
      this.dateService = new HijriDateService();
      this.loadData(moment())
    }

    this.scrollToYear()
  }

  onColorChanges(color: string) {
    this.element.nativeElement.style.setProperty('--color-primary', hexToRgb(color));
  }

  onGoToTodayClick() {
    const now = moment()
    this.loadData(now)
    this.onDateChange(now.format('YYYY/MM/DD'))
  }

  protected readonly moment = moment;

  changeCurrentMonth(month: string) {
    this.dates = this.dateService.loadDaysInMonthWithYearAndMonth(this.currentYear, month)
    this.currentYear = this.dateService.getCurrentYear(this.dates[1][6].date)
    this.currentMonth = this.dateService.getCurrentMonth(this.dates[1][6].date)
    this.scrollToYear()
    this.calendarMode = 'date'
  }


  changeCurrentYear(year: number) {
    this.dates = this.dateService.loadDaysInMonthWithYearAndMonth(year, this.currentMonth)
    this.currentYear = this.dateService.getCurrentYear(this.dates[1][6].date)
    this.currentMonth = this.dateService.getCurrentMonth(this.dates[1][6].date)
    this.scrollToYear()
    this.calendarMode = 'month'
  }

  scrollToYear() {
    this.scrollToIndex(Math.floor(parseInt(this.currentYear) / 4) - 2)
  }

  onMonthToggle() {
    this.calendarMode = this.calendarMode === 'month' ? 'date' : 'month'
  }

  onYearToggle() {
    this.calendarMode = this.calendarMode === 'year' ? 'date' : 'year'
  }

  datasource!: IDatasource

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
}
