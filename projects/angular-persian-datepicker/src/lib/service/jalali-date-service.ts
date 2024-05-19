import * as momentJalali from 'jalali-moment'
import * as moment from 'moment'
import * as momentHijri from 'moment-hijri'
import {extendMoment} from 'moment-range';
import {DateServiceInterface} from "./date-service-interface";

export class JalaliDateService implements DateServiceInterface {

    translate = {
        goToToday: 'برو به امروز',
        nextMonth: 'ماه بعد',
        previousMonth: 'ماه قبل',
        rtl: true
    };

    config = {
        rtl: true,
        WeekendDays: [6]
    }

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
        const jalaliDate = momentJalali(date)
        const jDaysInMonth = jalaliDate.jDaysInMonth();
        const jMonth = jalaliDate.jMonth()
        const jYear = jalaliDate.jYear()

        const startDate = moment(momentJalali(`${jYear}/${jMonth + 1}/01`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))
        const endDate = moment(momentJalali(`${jYear}/${jMonth + 1}/${jDaysInMonth}`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'))

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
        const year = moment(startDate).year()

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
                const jDate = momentJalali(day)
                const iDate = momentHijri(day)
                finalWeeks.push({
                    jDate: jDate,
                    iDate: iDate,
                    gDay: day.date(),
                    gDate: day,
                    date: jDate,
                    weekIndex: index,
                    day: jDate.date(),
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
