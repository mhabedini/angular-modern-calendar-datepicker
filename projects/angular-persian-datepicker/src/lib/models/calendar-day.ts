import {Moment} from "moment/moment";

export interface CalendarDay {
  isToday: boolean,
  weekDay: number,
  isForCurrentMonth?: boolean,
  date: Moment,
  day: number,
}
