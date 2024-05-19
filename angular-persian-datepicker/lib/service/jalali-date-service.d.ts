import { DateServiceInterface } from "./date-service-interface";
export declare class JalaliDateService implements DateServiceInterface {
    translate: {
        goToToday: string;
        nextMonth: string;
        previousMonth: string;
    };
    config: {
        rtl: boolean;
        WeekendDays: number[];
    };
    constructor();
    months(): string[];
    monthsShort(): string[];
    weekdays(): string[];
    weekdaysShort(): string[];
    daysInMonth(date: string): any[];
    loadDaysInMonthWithYearAndMonth(jYear: number, jMonth: string): any[];
    getCurrentMonth(date: any): string;
    getCurrentYear(date: any): string;
}
