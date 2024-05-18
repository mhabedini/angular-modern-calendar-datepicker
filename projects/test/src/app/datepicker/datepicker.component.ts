import {Component, ElementRef, Input} from '@angular/core';
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import * as moment from "moment";
import * as momentJalali from "jalali-moment";
import {Moment} from "moment";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {

  @Input() darkMode: boolean = false
  @Input() rtl: boolean = true

  selectedDate!: any
  dates!: any
  currentYear: any
  currentMonth: any

  constructor(public readonly jalaliDateService: JalaliDateService, element: ElementRef) {
    element.nativeElement.style.setProperty('--color-primary', this.hexToRgb('#8a2635'))
    this.loadData(moment().subtract(268, 'month'))
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
    // Remove the hash sign if it's included
    hex = hex.replace('#', '');

    // Convert the hex value to RGB
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
}
