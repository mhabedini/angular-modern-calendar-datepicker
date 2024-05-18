import * as moment from 'jalali-moment'
import {DateServiceInterface} from "./date-service-interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class JalaliDateService implements DateServiceInterface {
  constructor() {
    moment.locale('fa')
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
    ];
  }

  daysInMonth(date: string): number {
    return moment(date).daysInMonth();
  }
}
