import {DatepickerConfig} from "../models/datepicker-config";
import {DatepickerOptions} from "../models/datepicker-options";
import moment from "moment/moment";
import {Moment} from "moment/moment";
import {Datepicker} from "./datepicker";

export class GregorianDatepicker implements Datepicker {
  constructor() {
    moment.locale('en')
  }

  config: DatepickerConfig = {
    rtl: false,
    weekends: [0, 6]
  };

  options: DatepickerOptions = {
    translate: {
      goToToday: 'Select today',
      nextMonth: 'Next',
      previousMonth: 'Prev',
    }
  }

  generateDate(date: any): number {
    return moment(date).date()
  }

  generateEndDate(date: Moment): Moment {
    return moment([date.year(), date.month(), date.date()]).endOf('month')
  }

  generateStartDate(date: Moment): Moment {
    return moment([date.year(), date.month(), date.date()]).startOf('month')
  }

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
  currentYear(date: moment.Moment): number {
    return date.year();
  }

  currentMonth(date: moment.Moment) {
    return date.month();
  }

  parseDate(year: number, month: number, day: number): moment.Moment {
    return moment([year, month, day])
  }
}
