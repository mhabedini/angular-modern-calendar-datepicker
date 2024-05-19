import {Component, ElementRef, Input} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";
import {GregorianDateService} from "../../../../angular-persian-datepicker/src/lib/service/gregorian-date-service";
import {HijriDateService} from "../../../../angular-persian-datepicker/src/lib/service/hijri-date-service";
import {DateServiceInterface} from "../../../../angular-persian-datepicker/src/lib/service/date-service-interface";
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import {hexToRgb} from "../../../../angular-persian-datepicker/src/lib/helper/color-helper";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {
    @Input() darkMode: boolean = false
    @Input() primaryColor = '#58b038'
    @Input() calendarType: 'jalali' | 'gregorian' | 'hijri' | string = 'jalali'
    @Input() format: any = 'YYYY/MM/DD';

    calendarMode: "date" | "month" | "year" = "date"

    selectedDate: any
    dates!: any
    currentYear: any
    currentMonth: any
    dateService!: DateServiceInterface

    constructor(private readonly element: ElementRef) {
        this.dateService = new JalaliDateService()
        this.loadData(moment())
        this.onColorChanges(this.primaryColor)
    }

    ngOnInit() {
        this.selectedDate = moment().format('YYYY/MM/DD')
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

  changeCurrentMonth(month: string, i: number) {
    this.dates = this.dateService.loadDaysInMonthWithYearAndMonth(this.currentYear, i)
    this.currentYear = this.dateService.getCurrentYear(this.dates[1][6].date)
    this.currentMonth = this.dateService.getCurrentMonth(this.dates[1][6].date)

    this.calendarMode = 'date'
  }
}
