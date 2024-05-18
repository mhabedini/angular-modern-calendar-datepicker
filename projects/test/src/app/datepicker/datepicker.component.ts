import {Component, ElementRef, Input} from '@angular/core';
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import * as moment from "moment";
import * as momentJalali from "jalali-moment";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {

  @Input() darkMode: boolean = true

  selectedDate!: any
  dates!: any
  currentYear: any
  currentMonth: any

  constructor(public readonly jalaliDateService: JalaliDateService, element: ElementRef) {
    element.nativeElement.style.setProperty('--color-primary', this.hexToRgb('#7bb41b'))
    this.loadData(moment().format('YYYY/MM/DD'))
  }

  onPreviousMonthClick() {
    this.loadData(this.dates[1][6].date.subtract(1, 'month').format('YYYY/MM/DD'))
  }

  onNextMonthClick() {
    this.loadData(this.dates[1][6].date.add(1, 'month').format('YYYY/MM/DD'))
  }

  loadData(date: string) {
    this.dates = this.jalaliDateService.daysInMonth(date)
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
}
