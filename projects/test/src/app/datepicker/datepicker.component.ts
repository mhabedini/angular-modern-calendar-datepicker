import {Component} from '@angular/core';
import {JalaliDateService} from "../../../../angular-persian-datepicker/src/lib/service/jalali-date-service";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent {

  selectedDate!: any
  dates!: any

  constructor(public readonly jalaliDateService: JalaliDateService) {
    this.dates = jalaliDateService.daysInMonth('2024/05/18')
  }
}
