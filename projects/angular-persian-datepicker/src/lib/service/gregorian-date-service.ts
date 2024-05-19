import * as moment from 'moment'
import {DateServiceInterface} from "./date-service-interface";
import {extendMoment} from "moment-range";


export class GregorianDateService implements DateServiceInterface {
    translate = {
        goToToday: 'Select today',
        nextMonth: 'Next',
        previousMonth: 'Previous',
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

        const momentRange: any = extendMoment(moment)
        const monthRange = momentRange.range(startDate, endDate)

        const weeks: any[] = [];
        const days = Array.from(monthRange.by('day'));

        days.forEach((it: any) => {
            if (!weeks.includes(it.week())) {
                console.log(it.week)
                weeks.push(it.week());
            }
        })

        const calendar: any[] = []
        const now = moment()
        const startDateDayBefore = startDate.subtract(1, 'days').startOf('day')
        const endDateDayAfter = endDate.endOf('day')

        weeks.forEach(week => {
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
}
