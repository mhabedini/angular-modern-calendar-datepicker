import {Component, ElementRef, Input, OnInit} from '@angular/core';
import moment from "moment";
import {Moment} from "moment";
import {IDatasource} from "ngx-ui-scroll";
import {CalendarDay} from "../../models/calendar-day";
import {DatepickerService} from "../../service/datepicker-service";
import {DatepickerFactory} from "../../datepicker/datepicker-factory";
import {hexToRgb} from "../../helper/color-helper";

@Component({
    selector: 'apd-datepicker',
    templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {
    @Input() darkMode: boolean = false
    @Input() primaryColor = '#38b0ac'
    @Input() calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'
    @Input() format: any = 'YYYY/MM/DD';

    datasource!: IDatasource
    calendarMode: "date" | "month" | "year" = "date"
    selectedDate: any
    dates!: CalendarDay[][]
    dateService!: DatepickerService

    protected readonly moment = moment;

    constructor(private readonly element: ElementRef) {
        this.loadCalendar(new Date())
        console.log(this.dateService.config.weekends.includes(this.dates[2][2].weekDay))
    }

    ngOnInit() {
        this.onColorChanges(this.primaryColor)
    }

    onPreviousMonthClick() {
        this.loadCalendar(this.dates[1][1].date.subtract(1, 'month'))
    }

    onNextMonthClick() {
        this.loadCalendar(this.dates[1][1].date.add(1, 'month'))
    }

    loadCalendar(date: Moment | Date) {
        this.dateService = new DatepickerService(date, DatepickerFactory.create(this.calendarType))
        this.dates = this.dateService.calendar()
        this.scrollToYear()
    }

    onDateChange(value: string) {
        this.loadCalendar(moment(value))
        this.selectedDate = moment(value).format('YYYY/MM/DD')
    }

    onColorChanges(color: string) {
        this.element.nativeElement.style.setProperty('--color-primary', hexToRgb(color));
    }

    onGoToTodayClick() {
        this.loadCalendar(moment())
        this.onDateChange(moment().format('YYYY/MM/DD'))
    }

    changeCurrentMonth(month: number) {
        const date = this.dateService.parseLocalDate(this.dateService.currentYear, month, 15)
        this.loadCalendar(date)
        this.calendarMode = 'date'
    }


    changeCurrentYear(year: number) {
        const date = this.dateService.parseLocalDate(year, this.dateService.currentMonth, 15)
        this.loadCalendar(date)
        this.calendarMode = 'month'
    }

    scrollToYear() {
        this.scrollToIndex(Math.floor(this.dateService.currentYear / 4) - 2)
    }

    onMonthToggle() {
        this.calendarMode = this.calendarMode === 'month' ? 'date' : 'month'
    }

    onYearToggle() {
        this.calendarMode = this.calendarMode === 'year' ? 'date' : 'year'
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
}
