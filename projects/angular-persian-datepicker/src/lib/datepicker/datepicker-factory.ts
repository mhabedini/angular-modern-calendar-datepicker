import {GregorianDatepicker} from "./gregorian-datepicker";
import {JalaliDatepicker} from "./jalali-datepicker";
import {HijriDatepicker} from "./hijri-datepicker";
import {CalendarType} from "../models/calendar-type";

export class DatepickerFactory {
  // noinspection JSUnusedLocalSymbols
  private constructor() {
  }

  static create(datepickerType: CalendarType) {
    if (datepickerType === CalendarType.GREGORIAN) {
      return new GregorianDatepicker();
    }
    if (datepickerType === CalendarType.JALALI) {
      return new JalaliDatepicker()
    }
    if (datepickerType === CalendarType.HIJRI) {
      return new HijriDatepicker()
    }
    throw new BadArgumentError()
  }
}

class BadArgumentError extends Error {
}
