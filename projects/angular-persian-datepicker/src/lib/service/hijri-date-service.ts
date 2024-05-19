import * as moment from 'moment'
import * as momentHijri from 'moment-hijri'
import {extendMoment} from 'moment-range';
import {DateServiceInterface} from "./date-service-interface";
import {getWeekFirstAndLastDays, processDateRange} from "../helper/date-helper";

export class HijriDateService implements DateServiceInterface {

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
        momentHijri.locale('ar-SA', {useGregorianParser: true})
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
        return momentHijri.weekdays();
    }

    weekdaysShort(): string[] {
        return momentHijri.weekdaysShort();
    }

    daysInMonth(date: string): any[] {
        const hijriDate = momentHijri(date)
        const iDaysInMonth = hijriDate.iDaysInMonth();
        const iMonth = hijriDate.iMonth()
        const iYear = hijriDate.iYear()

        const startDate = moment(momentHijri(`${iYear}/${iMonth + 1}/01`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'))
        const endDate = moment(momentHijri(`${iYear}/${iMonth + 1}/${iDaysInMonth}`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'))
        const year = moment(startDate).year()

        console.log(startDate);
        console.log(endDate);

        const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate)

        const momentRange: any = extendMoment(moment)
        const calendar: any[] = []
        const now = moment()

        weeks.forEach((week: any) => {
            let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year)

            const weekRange = momentRange.range(firstWeekDay, lastWeekDay)
            const finalWeeks: any[] = []
            Array.from(weekRange.by('day')).forEach((day: any, index) => {
                const iDate = momentHijri(day.format('YYYY/MM/DD'), 'YYYY/MM/DD')
                console.log(iDate.format('YYYY/MM/DD'))
                finalWeeks.push({
                    gDate: day,
                    date: iDate,
                    weekIndex: index,
                    day: iDate.iDate(),
                    isToday: day.isSame(now, "day"),
                    isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
                })
            })
            calendar.push(finalWeeks);
        })

        return calendar
    }
}
