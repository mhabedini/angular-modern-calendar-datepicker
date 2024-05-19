import { DateServiceInterface } from "./date-service-interface";
export declare class GregorianDateService implements DateServiceInterface {
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
    daysInMonth(date: any): any[];
    getCurrentMonth(date: any): string;
    getCurrentYear(date: any): string;
    loadDaysInMonthWithYearAndMonth(year: number, month: string): any[];
}
