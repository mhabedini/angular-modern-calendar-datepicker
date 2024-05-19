import * as moment from 'moment'
import {DateServiceInterface} from "./date-service-interface";
import {getWeekFirstAndLastDays, processDateRange} from "../helper/date-helper";
import {extendMoment} from "moment-range";


export class GregorianDateService implements DateServiceInterface {
  translate = {
    goToToday: 'Select today',
    nextMonth: 'Next',
    previousMonth: 'Prev',
  };

  config = {
    rtl: false,
    WeekendDays: [0, 6]
  }

  constructor() {
    moment.locale('en')
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

  daysInMonth(date: any): any[] {
    date = moment(date)
    const month = date.month()
    const year = date.year()

    const startDate = moment([year, month, date.startOf('month').date()])
    const endDate = moment([year, month, date.endOf('month').date()])

    const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate)

    const momentRange: any = extendMoment(moment)
    const calendar: any[] = []
    const now = moment()

    weeks.forEach((week: any) => {
      let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year)

      const weekRange = momentRange.range(firstWeekDay, lastWeekDay)
      const finalWeeks: any[] = []
      Array.from(weekRange.by('day')).forEach((day: any, index) => {
        finalWeeks.push({
          date: day,
          gDate: day,
          weekIndex: index,
          day: day.date(),
          isToday: day.isSame(now, "day"),
          isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
        })
      })
      calendar.push(finalWeeks);
    })

    return calendar
  }

  getCurrentMonth(date: any): string {
    return date.format('MMMM')
  }

  getCurrentYear(date: any): string {
    return date.format('YYYY')
  }

  loadDaysInMonthWithYearAndMonth(year: number, month: number): any[] {
    const date = moment([year, month, 1])
    return this.daysInMonth(date.format('YYYY/MM/DD'))
  }
}
