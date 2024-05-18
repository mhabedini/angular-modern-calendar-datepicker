import * as momentJalali from 'jalali-moment'
import * as moment from 'moment'
import * as momentHijri from 'moment-hijri'

import {extendMoment} from 'moment-range';

import {DateServiceInterface} from "./date-service-interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class JalaliDateService implements DateServiceInterface {
  constructor() {
    momentJalali.locale('fa', {useGregorianParser: true})
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
    return [
      "ش",
      "ی",
      "د",
      "س",
      "چ",
      "پ",
      "ج"
    ];
  }

  daysInMonth(date: string): any[] {
    const jDaysInMonth = momentJalali(date).jDaysInMonth();
    const jMonth = momentJalali(date).jMonth()
    const jYear = momentJalali(date).jYear()

    const startDate = moment(momentJalali(`${jYear}/${jMonth + 1}/01`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))
    const endDate = moment(momentJalali(`${jYear}/${jMonth + 1}/${jDaysInMonth}`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))

    const year = moment(startDate).year()
    const month = moment(startDate).month() + 1

    const momentRange: any = extendMoment(moment)
    const monthRange = momentRange.range(startDate, endDate)

    const weeks: any[] = [];
    const days = Array.from(monthRange.by('day'));

    days.forEach((it: any) => {
      if (!weeks.includes(it.week())) {
        weeks.push(it.week());
      }
    })

    const calendar: any[] = []
    const now = moment()
    const startDateDayBefore = startDate.subtract(1, 'days').startOf('day')
    const endDateDayAfter = endDate.endOf('day')

    weeks.forEach(week => {
      const firstWeekDay = moment([year, month]).week(week).startOf('week')
      const lastWeekDay = moment([year, month]).week(week).endOf('week')
      const weekRange = momentRange.range(firstWeekDay, lastWeekDay)
      const finalWeeks: any[] = []
      Array.from(weekRange.by('day')).forEach((day: any, index) => {
        const jDate = momentJalali(day)
        const iDate = momentHijri(day)
        finalWeeks.push({
          jDate: jDate,
          date: day,
          weekIndex: index,
          day: day.date(),
          jDay: jDate.jDate(),
          iDay: iDate.iDate(),
          isToday: day.isSame(now, "day"),
          isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
        })
      })
      calendar.push(finalWeeks);
    })

    return calendar
  }
}
