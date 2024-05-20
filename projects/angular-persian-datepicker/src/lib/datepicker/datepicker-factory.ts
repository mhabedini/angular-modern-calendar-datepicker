import {GregorianDatepicker} from "./gregorian-datepicker";
import {JalaliDatepicker} from "./jalali-datepicker";
import {HijriDatepicker} from "./hijri-datepicker";

export class DatepickerFactory {
  // noinspection JSUnusedLocalSymbols
  private constructor() {
  }

  static create(datepickerType: 'hijri' | 'jalali' | 'gregorian') {
    if (datepickerType === "gregorian") {
      return new GregorianDatepicker();
    } else if (datepickerType === "jalali") {
      return new JalaliDatepicker()
    } else if (datepickerType === "hijri") {
      return new HijriDatepicker()
    }
    throw new BadArgumentError()
  }
}

class BadArgumentError extends Error {
}
