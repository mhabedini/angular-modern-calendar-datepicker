import {DatepickerConfig} from "../models/datepicker-config";
import {DatepickerOptions} from "../models/datepicker-options";
import {Moment} from "moment/moment";

export interface Datepicker {
  config: DatepickerConfig

  options: DatepickerOptions

  months(): string[]

  monthsShort(): string[]

  weekdays(): string[]

  weekdaysShort(): string[]

  generateDate(date: any): number

  generateStartDate(date: Moment): Moment

  generateEndDate(date: Moment): Moment

  currentYear(date: Moment): number

  currentMonth(date: Moment): number

  parseDate(year: number, month: number, day: number): Moment
}
