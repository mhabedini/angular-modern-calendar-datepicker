import {DatepickerConfig} from "../models/datepicker-config";
import {DatepickerOptions} from "../models/datepicker-options";
import momentHijri from 'moment-hijri'
import {Moment} from "moment/moment";
import moment from "moment/moment";
import {Datepicker} from "./datepicker";

export class HijriDatepicker implements Datepicker {
  constructor() {
    momentHijri.updateLocale('ar-SA', {useGregorianParser: true})
  }

  config: DatepickerConfig = {
    rtl: true,
    weekends: [6]
  };

  options: DatepickerOptions = {
    translate: {
      goToToday: 'اذهب إلى اليوم',
      nextMonth: 'القادم',
      previousMonth: 'الماضي',
    }
  }

  generateDate(date: any): number {
    return momentHijri(date).iDate()
  }

  generateEndDate(date: Moment): moment.Moment {
    const hijriDate = momentHijri(date)
    const iDaysInMonth = hijriDate.iDaysInMonth();
    const iMonth = hijriDate.iMonth()
    const iYear = hijriDate.iYear()
    return moment(momentHijri(`${iYear}/${iMonth + 1}/${iDaysInMonth}`, 'iYYYY/iMM/iDD'))
  }

  generateStartDate(date: moment.Moment): moment.Moment {
    const hijriDate = momentHijri(date)
    const iMonth = hijriDate.iMonth()
    const iYear = hijriDate.iYear()
    return moment(momentHijri(`${iYear}/${iMonth + 1}/01`, 'iYYYY/iMM/iDD'))
  }

  months(): string[] {
    return [
      "محرم",
      "صفر",
      "ربیع الاول",
      "ربیع الثانی",
      "جمادی الاول",
      "جمادی الثانی",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذیقعده",
      "ذیحجه",
    ];
  }

  monthsShort(): string[] {
    return [
      "محرم",
      "صفر",
      "ربیع الاول",
      "ربیع الثانی",
      "جمادی الاول",
      "جمادی الثانی",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذیقعده",
      "ذیحجه",
    ];
  }

  weekdays(): string[] {
    return [
      "السبت",
      "الأحد",
      "الأثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعه",
    ];
  }

  weekdaysShort(): string[] {
    return [
      "السبت",
      "الأحد",
      "الأثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعه",
    ];
  }

  currentYear(date: moment.Moment): number {
    return momentHijri(date).iYear();
  }

  currentMonth(date: moment.Moment) {
    return momentHijri(date).iMonth();
  }

  parseDate(year: number, month: number, day: number): moment.Moment {
    return moment(momentHijri(`${year}/${month + 1}/${day}`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'))
  }
}
