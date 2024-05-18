import * as moment from 'jalali-moment'
import {DateServiceInterface} from "./date-service-interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GregorianDateService implements DateServiceInterface {
  months(): string[] {
    return moment.months();
  }

  monthsShort(): string[] {
    return moment.monthsShort();
  }

  weekdays(): string[] {
    return moment.weekdays();
  }

  weekdaysShort(): string[] {
    return moment.weekdaysShort().map(value => value.substring(0, 2));
  }

  daysInMonth(date: string): any[] {
    return []
  }
}
