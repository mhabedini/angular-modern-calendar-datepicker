import {Component, ElementRef, Input} from '@angular/core';
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import * as moment from "moment";
import {Moment} from "moment";
import * as momentJalali from "jalali-moment";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {
  @Input() darkMode: boolean = false
  @Input() rtl: boolean = true
  @Input() primaryColor = '#ff516c'

  selectedDate: any = moment().format('YYYY/MM/DD')
  dates!: any
  currentYear: any
  currentMonth: any

  constructor(public readonly jalaliDateService: JalaliDateService, private readonly element: ElementRef) {
    this.loadData(moment())
    this.onColorChanges(this.primaryColor)
  }

  onPreviousMonthClick() {
    this.loadData(this.dates[1][6].date.subtract(1, 'month'))
  }

  onNextMonthClick() {
    this.loadData(this.dates[1][6].date.add(1, 'month'))
  }

  loadData(date: Moment) {
    this.dates = this.jalaliDateService.daysInMonth(date.format('YYYY/MM/DD'))
    this.currentYear = this.dates[1][6].jDate.format('YYYY')
    this.currentMonth = this.dates[1][6].jDate.format('MMMM')
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

  onColorChanges(color: string) {
    this.element.nativeElement.style.setProperty('--color-primary', this.hexToRgb(color));
  }
}
