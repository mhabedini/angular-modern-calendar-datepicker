import moment from "moment";
import {Moment} from "moment";
import {extendMoment} from "moment-range";
import {DatepickerOptions} from "../models/datepicker-options";
import {DatepickerConfig} from "../models/datepicker-config";
import {CalendarDay} from "../models/calendar-day";
import {Datepicker} from "../datepicker/datepicker";

export class DatepickerService {
  private readonly _datepicker: Datepicker;
  private readonly _currentMonth!: number
  private readonly _currentYear!: number
  private readonly _currentMonthName!: string
  private readonly _months!: string[]
  private readonly _monthsShort!: string[]
  private readonly _weekdays!: string[]
  private readonly _weekdaysShort!: string[]
  private readonly _date!: Moment

  private readonly _options!: DatepickerOptions
  private readonly _config!: DatepickerConfig

  constructor(date: Date | Moment, datepicker: Datepicker) {
    this._datepicker = datepicker;
    if (date instanceof Date) {
      this._currentMonth = date.getMonth()
      this._currentYear = date.getFullYear()
      this._date = moment(date)
    } else if (date instanceof moment) {
      this._currentMonth = date.month()
      this._currentYear = date.year()
      this._date = date
    }

    this._config = this.datepicker.config
    this._options = this.datepicker.options
    this._months = this.datepicker.months()
    this._monthsShort = this.datepicker.monthsShort()
    this._weekdays = this.datepicker.weekdays()
    this._weekdaysShort = this.datepicker.weekdaysShort()
    this._currentMonthName = this.months[this.currentMonth]
  }

  get currentYear(): number {
    return this.datepicker.currentYear(this._date);
  }

  get currentMonth(): number {
    return this.datepicker.currentMonth(this._date);
  }

  get weekdaysShort(): string[] {
    return this._weekdaysShort;
  }

  get weekdays(): string[] {
    return this._weekdays;
  }

  get monthsShort(): string[] {
    return this._monthsShort;
  }

  get months(): string[] {
    return this._months;
  }

  get datepicker(): Datepicker {
    return this._datepicker;
  }

  get options(): DatepickerOptions {
    return this._options;
  }

  get config(): DatepickerConfig {
    return this._config;
  }

  get date(): moment.Moment {
    return this._date;
  }

  get currentMonthName(): string {
    return this._currentMonthName;
  }

  calendar(): CalendarDay[][] {
    const startDate = this.datepicker.generateStartDate(this.date)
    const endDate = this.datepicker.generateEndDate(this.date)
    const year = moment(startDate).year()

    const [weeks, startDateDayBefore, endDateDayAfter] = this.processDateRange(startDate, endDate)

    const momentRange: any = extendMoment(moment)
    const calendar: CalendarDay[][] = []
    const now = moment()

    weeks.forEach((week: any) => {
      let [firstWeekDay, lastWeekDay] = this.generateWeeksFirstAndLastDay(weeks, week, year)

      const weekRange = momentRange.range(firstWeekDay, lastWeekDay)
      const finalWeeks: CalendarDay[] = []
      Array.from(weekRange.by('day')).forEach((date: any, index) => {
        finalWeeks.push({
          weekDay: index,
          day: this.datepicker.generateDate(date),
          date: date,
          isForCurrentMonth: date.isBetween(startDateDayBefore, endDateDayAfter),
          isToday: date.isSame(now, "day")
        })
      })
      calendar.push(finalWeeks);
    })
    return calendar
  }

  parseLocalDate(year: number, month: number, day: number): Moment {
    return this.datepicker.parseDate(year, month, day)
  }


  generateWeeksFirstAndLastDay(weeks: any[], week: number, year: number): Moment[] {
    let firstWeekDay
    let lastWeekDay

    if (weeks.includes(53) || weeks.includes(52)) {
      let highestWeek: 52 | 53 = 52
      if (weeks.includes(53)) {
        highestWeek = 53
      }
      if (week === highestWeek) {
        firstWeekDay = moment([year, 11]).week(week).startOf('week');
        lastWeekDay = moment([year, 11]).week(week).endOf('week');
      } else if (week === 1) {
        firstWeekDay = moment([year + 1, 0]).week(week).startOf('week');
        lastWeekDay = moment([year + 1, 0]).week(week).endOf('week');
      } else if (week < highestWeek && week > 5) {
        firstWeekDay = moment([year]).week(week).startOf('week');
        lastWeekDay = moment([year]).week(week).endOf('week');
      } else {
        firstWeekDay = moment([year + 1]).week(week).startOf('week');
        lastWeekDay = moment([year + 1]).week(week).endOf('week');
      }
    } else {
      firstWeekDay = moment([year]).week(week).startOf('week');
      lastWeekDay = moment([year]).week(week).endOf('week');
    }

    return [firstWeekDay, lastWeekDay]
  }

  processDateRange(startDate: Moment, endDate: Moment): any[] {
    const momentRange: any = extendMoment(moment)
    const monthRange = momentRange.range(startDate, endDate)

    const weeks: any[] = [];
    const days = Array.from(monthRange.by('day'));

    days.forEach((it: any) => {
      if (!weeks.includes(it.week())) {
        weeks.push(it.week());
      }
    })

    const startDateDayBefore = startDate.subtract(1, 'days').startOf('day')
    const endDateDayAfter = endDate.endOf('day')

    return [weeks, startDateDayBefore, endDateDayAfter]
  }
}
