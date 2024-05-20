import {DatepickerConfig} from "../models/datepicker-config";
import {DatepickerOptions} from "../models/datepicker-options";
import * as momentJalali from "jalali-moment";
import * as moment from "moment/moment";
import {Datepicker} from "./datepicker";

export class JalaliDatepicker implements Datepicker {
  constructor() {
    moment.updateLocale('fa', {useGregorianParser: true})
  }

  config: DatepickerConfig = {
    rtl: true,
    weekends: [6]
  };

  options: DatepickerOptions = {
    translate: {
      goToToday: 'برو به امروز',
      nextMonth: 'ماه بعد',
      previousMonth: 'ماه قبل',
    }
  }

  generateDate(date: any): number {
    return momentJalali(date).jDate()
  }

  generateEndDate(date: any): moment.Moment {
    const jalaliDate = momentJalali(date)
    const jDaysInMonth = jalaliDate.jDaysInMonth();
    const jMonth = jalaliDate.jMonth()
    const jYear = jalaliDate.jYear()
    const endJalaliDate: any = momentJalali(`${jYear}/${jMonth + 1}/${jDaysInMonth}`, 'jYYYY/jMM/jDD').doAsGregorian()
    return moment(endJalaliDate)
  }

  generateStartDate(date: any): moment.Moment {
    const jalaliDate = momentJalali(date)
    const jMonth = jalaliDate.jMonth()
    const jYear = jalaliDate.jYear()
    const startJalaliDate: any = momentJalali(`${jYear}/${jMonth + 1}/01`, 'jYYYY/jMM/jDD').doAsGregorian()
    return moment(startJalaliDate);
  }

  months(): string[] {
    return [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
  }

  monthsShort(): string[] {
    return [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
  }

  weekdays(): string[] {
    return [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ];
  }

  weekdaysShort(): string[] {
    return this.weekdays().map(value => value[0]);
  }

  currentYear(date: any): number {
    return momentJalali(date).jYear();
  }

  currentMonth(date: any) {
    return momentJalali(date).jMonth();
  }

  parseDate(year: number, month: number, day: number): moment.Moment {
    return moment(momentJalali(`${year}/${month + 1}/${day}`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))
  }
}
