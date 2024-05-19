import * as moment$1 from 'moment';
import * as momentHijri from 'moment-hijri';
import { extendMoment } from 'moment-range';
import * as moment from 'moment/moment';
import * as momentJalali from 'jalali-moment';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';

function getWeekFirstAndLastDays(weeks, week, year) {
    let firstWeekDay;
    let lastWeekDay;
    if (weeks.includes(53) || weeks.includes(52)) {
        let highestWeek = 52;
        if (weeks.includes(53)) {
            highestWeek = 53;
        }
        if (week === highestWeek) {
            firstWeekDay = moment([year, 11]).week(week).startOf('week');
            lastWeekDay = moment([year, 11]).week(week).endOf('week');
        }
        else if (week === 1) {
            firstWeekDay = moment([year + 1, 0]).week(week).startOf('week');
            lastWeekDay = moment([year + 1, 0]).week(week).endOf('week');
        }
        else if (week < highestWeek && week > 5) {
            firstWeekDay = moment([year]).week(week).startOf('week');
            lastWeekDay = moment([year]).week(week).endOf('week');
        }
        else {
            firstWeekDay = moment([year + 1]).week(week).startOf('week');
            lastWeekDay = moment([year + 1]).week(week).endOf('week');
        }
    }
    else {
        firstWeekDay = moment([year]).week(week).startOf('week');
        lastWeekDay = moment([year]).week(week).endOf('week');
    }
    return [firstWeekDay, lastWeekDay];
}
function processDateRange(startDate, endDate) {
    const momentRange = extendMoment(moment);
    const monthRange = momentRange.range(startDate, endDate);
    const weeks = [];
    const days = Array.from(monthRange.by('day'));
    days.forEach((it) => {
        if (!weeks.includes(it.week())) {
            weeks.push(it.week());
        }
    });
    const startDateDayBefore = startDate.subtract(1, 'days').startOf('day');
    const endDateDayAfter = endDate.endOf('day');
    return [weeks, startDateDayBefore, endDateDayAfter];
}

class HijriDateService {
    constructor() {
        this.translate = {
            goToToday: 'برو به امروز',
            nextMonth: 'ماه بعد',
            previousMonth: 'ماه قبل',
        };
        this.config = {
            rtl: true,
            WeekendDays: [6]
        };
        momentHijri.locale('ar-SA', { useGregorianParser: true });
    }
    months() {
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
    monthsShort() {
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
    weekdays() {
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
    weekdaysShort() {
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
    daysInMonth(date) {
        const hijriDate = momentHijri(date);
        const iDaysInMonth = hijriDate.iDaysInMonth();
        const iMonth = hijriDate.iMonth();
        const iYear = hijriDate.iYear();
        const startDate = moment$1(momentHijri(`${iYear}/${iMonth + 1}/01`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'));
        const endDate = moment$1(momentHijri(`${iYear}/${iMonth + 1}/${iDaysInMonth}`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'));
        const year = moment$1(startDate).year();
        console.log(startDate);
        console.log(endDate);
        const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate);
        const momentRange = extendMoment(moment$1);
        const calendar = [];
        const now = moment$1();
        weeks.forEach((week) => {
            let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year);
            const weekRange = momentRange.range(firstWeekDay, lastWeekDay);
            const finalWeeks = [];
            Array.from(weekRange.by('day')).forEach((day, index) => {
                const iDate = momentHijri(day.format('YYYY/MM/DD'), 'YYYY/MM/DD');
                console.log(iDate.format('YYYY/MM/DD'));
                finalWeeks.push({
                    gDate: day,
                    date: iDate,
                    weekIndex: index,
                    day: iDate.iDate(),
                    isToday: day.isSame(now, "day"),
                    isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
                });
            });
            calendar.push(finalWeeks);
        });
        return calendar;
    }
    getCurrentMonth(date) {
        return this.months()[date.iMonth()];
    }
    getCurrentYear(date) {
        return date.format('iYYYY');
    }
    loadDaysInMonthWithYearAndMonth(iYear, iMonth) {
        const date = moment$1(momentHijri(`${iYear}/${this.months().indexOf(iMonth) + 1}/01`, 'iYYYY/iMM/iDD').format('YYYY/MM/DD'));
        return this.daysInMonth(date.format('YYYY/MM/DD'));
    }
}

class JalaliDateService {
    constructor() {
        this.translate = {
            goToToday: 'برو به امروز',
            nextMonth: 'ماه بعد',
            previousMonth: 'ماه قبل',
        };
        this.config = {
            rtl: true,
            WeekendDays: [6]
        };
        momentJalali.locale('fa', { useGregorianParser: true });
    }
    months() {
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
    monthsShort() {
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
    weekdays() {
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
    weekdaysShort() {
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
    daysInMonth(date) {
        const jalaliDate = momentJalali(date);
        const jDaysInMonth = jalaliDate.jDaysInMonth();
        const jMonth = jalaliDate.jMonth();
        const jYear = jalaliDate.jYear();
        const startDate = moment$1(momentJalali(`${jYear}/${jMonth + 1}/01`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'));
        const endDate = moment$1(momentJalali(`${jYear}/${jMonth + 1}/${jDaysInMonth}`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'));
        const year = moment$1(startDate).year();
        const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate);
        const momentRange = extendMoment(moment$1);
        const calendar = [];
        const now = moment$1();
        weeks.forEach((week) => {
            let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year);
            const weekRange = momentRange.range(firstWeekDay, lastWeekDay);
            const finalWeeks = [];
            Array.from(weekRange.by('day')).forEach((day, index) => {
                const jDate = momentJalali(day);
                finalWeeks.push({
                    gDate: day,
                    date: jDate,
                    weekIndex: index,
                    day: jDate.date(),
                    isToday: day.isSame(now, "day"),
                    isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
                });
            });
            calendar.push(finalWeeks);
        });
        return calendar;
    }
    loadDaysInMonthWithYearAndMonth(jYear, jMonth) {
        const date = moment$1(momentJalali(`${jYear}/${this.months().indexOf(jMonth) + 1}/01`, 'jYYYY/jMM/jDD').doAsGregorian().format('YYYY/MM/DD'));
        return this.daysInMonth(date.format('YYYY/MM/DD'));
    }
    getCurrentMonth(date) {
        return date.format('MMMM');
    }
    getCurrentYear(date) {
        return date.format('YYYY');
    }
}

class GregorianDateService {
    constructor() {
        this.translate = {
            goToToday: 'Select today',
            nextMonth: 'Next',
            previousMonth: 'Prev',
        };
        this.config = {
            rtl: false,
            WeekendDays: [0, 6]
        };
        moment$1.locale('en');
    }
    months() {
        return moment$1.months();
    }
    monthsShort() {
        return moment$1.monthsShort();
    }
    weekdays() {
        return moment$1.weekdays();
    }
    weekdaysShort() {
        return moment$1.weekdaysShort().map(value => value.substring(0, 2));
    }
    daysInMonth(date) {
        date = moment$1(date);
        const month = date.month();
        const year = date.year();
        const startDate = moment$1([year, month, date.startOf('month').date()]);
        const endDate = moment$1([year, month, date.endOf('month').date()]);
        const [weeks, startDateDayBefore, endDateDayAfter] = processDateRange(startDate, endDate);
        const momentRange = extendMoment(moment$1);
        const calendar = [];
        const now = moment$1();
        weeks.forEach((week) => {
            let [firstWeekDay, lastWeekDay] = getWeekFirstAndLastDays(weeks, week, year);
            const weekRange = momentRange.range(firstWeekDay, lastWeekDay);
            const finalWeeks = [];
            Array.from(weekRange.by('day')).forEach((day, index) => {
                finalWeeks.push({
                    date: day,
                    gDate: day,
                    weekIndex: index,
                    day: day.date(),
                    isToday: day.isSame(now, "day"),
                    isForCurrentMonth: day.isBetween(startDateDayBefore, endDateDayAfter)
                });
            });
            calendar.push(finalWeeks);
        });
        return calendar;
    }
    getCurrentMonth(date) {
        return date.format('MMMM');
    }
    getCurrentYear(date) {
        return date.format('YYYY');
    }
    loadDaysInMonthWithYearAndMonth(year, month) {
        const date = moment$1([year, this.months().indexOf(month), 1]);
        return this.daysInMonth(date.format('YYYY/MM/DD'));
    }
}

class AngularPersianDatepickerComponent {
}
AngularPersianDatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AngularPersianDatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AngularPersianDatepickerComponent, selector: "lib-angular-persian-datepicker", ngImport: i0, template: `
    <p>
      angular-persian-datepicker works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-angular-persian-datepicker', template: `
    <p>
      angular-persian-datepicker works!
    </p>
  ` }]
        }] });

class AngularPersianDatepickerModule {
}
AngularPersianDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AngularPersianDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerModule, declarations: [AngularPersianDatepickerComponent], exports: [AngularPersianDatepickerComponent] });
AngularPersianDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AngularPersianDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AngularPersianDatepickerComponent
                    ],
                    imports: [],
                    exports: [
                        AngularPersianDatepickerComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of angular-persian-datepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularPersianDatepickerComponent, AngularPersianDatepickerModule, GregorianDateService, HijriDateService, JalaliDateService };
//# sourceMappingURL=angular-persian-datepicker.mjs.map
