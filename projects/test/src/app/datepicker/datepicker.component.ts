import {Component} from '@angular/core';
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";
import * as moment from "moment";
import * as momentJalali from "jalali-moment";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {

  selectedDate!: any
  dates!: any
  currentYear: any
  currentMonth: any

  constructor(public readonly jalaliDateService: JalaliDateService) {
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

  protected readonly momentJalali = momentJalali;
}
