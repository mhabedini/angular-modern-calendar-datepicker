import * as momentJalali from 'jalali-moment'
import * as moment from 'moment'
import {extendMoment} from 'moment-range';
import {DateServiceInterface} from "./date-service-interface";
import {getWeekFirstAndLastDays, processDateRange} from "../helper/date-helper";

export class JalaliDateService implements DateServiceInterface {

    translate = {
        goToToday: 'برو به امروز',
        nextMonth: 'ماه بعد',
        previousMonth: 'ماه قبل',
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
        const year = moment(startDate).year()

        const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate)

        const momentRange: any = extendMoment(moment)
        const calendar: any[] = []
        const now = moment()

        weeks.forEach((week: any) => {
            let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year)

            const weekRange = momentRange.range(firstWeekDay, lastWeekDay)
            const finalWeeks: any[] = []
            Array.from(weekRange.by('day')).forEach((day: any, index) => {
                const jDate = momentJalali(day)
                finalWeeks.push({
                    gDate: day,
                    date: jDate,
                    weekIndex: index,
                    day: jDate.date(),
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
}
