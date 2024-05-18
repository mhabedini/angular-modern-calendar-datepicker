export interface DateServiceInterface {
  months(): string[]

  monthsShort(): string[]

  weekdays(): string[]

  weekdaysShort(): string[]

  daysInMonth(date: string): any[]
}
