export interface DateServiceInterface {
    translate: {
        goToToday: string;
        nextMonth: string;
        previousMonth: string;
    };
    config: {
        rtl: boolean;
        WeekendDays: number[];
    };
    months(): string[];
    monthsShort(): string[];
    weekdays(): string[];
    weekdaysShort(): string[];
    daysInMonth(date: string): any[];
    getCurrentMonth(date: any): string;
    getCurrentYear(date: any): string;
    loadDaysInMonthWithYearAndMonth(year: number, month: string): any[];
}
