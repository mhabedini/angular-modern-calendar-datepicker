import {Component, ElementRef, Input} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";
import * as momentJalali from "jalali-moment";
import {GregorianDateService} from "../../../../angular-persian-datepicker/src/lib/service/gregorian-date-service";
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import {DateServiceInterface} from "../../../../angular-persian-datepicker/src/lib/service/date-service-interface";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {
    @Input() darkMode: boolean = false
    @Input() primaryColor = '#58b038'
    @Input() calendarType: 'jalali' | 'gregorian' | string = 'jalali'

    rtl: boolean = true
    selectedDate: any = moment().format('YYYY/MM/DD')
    dates!: any
    currentYear: any
    currentMonth: any
    dateService!: DateServiceInterface

    constructor(private readonly element: ElementRef) {
        momentJalali.locale('fa', {useGregorianParser: true})
        this.dateService = new JalaliDateService()
        this.loadData(moment())
        this.onColorChanges(this.primaryColor)
    }

    onPreviousMonthClick() {
        this.loadData(this.dates[1][6].gDate.subtract(1, 'month'))
    }

    onNextMonthClick() {
        this.loadData(this.dates[1][6].gDate.add(1, 'month'))
    }

    loadData(date: Moment) {
        this.dates = this.dateService.daysInMonth(date.format('YYYY/MM/DD'))
        this.currentYear = this.dates[1][6].date.format('YYYY')
        this.currentMonth = this.dates[1][6].date.format('MMMM')
    }

    hexToRgb(hex: string): string {
        hex = hex.replace('#', '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r} ${g} ${b}`;
    }

    protected readonly momentJalali = momentJalali;

    onDateChange(value: string) {
        this.loadData(moment(value))
        this.selectedDate = moment(value).format('YYYY/MM/DD')
    }

    onJalaliDateChange(value: string) {
        const date = moment(momentJalali(value, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))
        this.loadData(date);
        this.selectedDate = date.format('YYYY/MM/DD')
    }

    onCalendarTypeChange(type: string) {
        this.calendarType = type
        if (type === 'jalali') {
            this.dateService = new JalaliDateService();
            this.loadData(moment())
        } else if (type === 'gregorian') {
            this.dateService = new GregorianDateService();
            this.loadData(moment())
        }
    }

    onColorChanges(color: string) {
        this.element.nativeElement.style.setProperty('--color-primary', this.hexToRgb(color));
    }

    onGoToTodayClick() {
        const now = moment()
        this.loadData(now)
        this.onDateChange(now.format('YYYY/MM/DD'))
    }
}
