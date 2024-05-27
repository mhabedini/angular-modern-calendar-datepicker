import {Moment} from "moment";

export interface DatepickerConfig {
  rtl: boolean
  weekends: number[]
  min?: Moment
  max?: Moment
  isPastDisabled?: Moment
  showMonthOutOfRangeDays?: boolean
}
