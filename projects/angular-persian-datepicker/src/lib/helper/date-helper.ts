import {Moment} from "moment";
import * as moment from "moment/moment";
import {extendMoment} from "moment-range";

export function getWeekFirstAndLastDays(weeks: any[], week: number, year: number): Moment[] {
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

export function processDateRange(startDate: Moment, endDate: Moment): any[] {
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
