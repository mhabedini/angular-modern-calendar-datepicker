import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewContainerRef
} from "@angular/core";
import {AmdDatepickerPopupComponent} from "../components/datepicker-popup/amd-datepicker-popup.component";
import {randomStr} from "../helper/color-helper";
import {DateRange} from "../models/date-range";
import moment, {Moment} from "moment";
import {CalendarType} from "../models/calendar-type";
import {CalendarMode} from "../models/calendar-mode";
import {NgControl} from "@angular/forms";

@Directive({selector: '[amd-datepicker]'})
export class AmdDatepickerDirective implements OnInit {
  datepickerRef!: ComponentRef<AmdDatepickerPopupComponent> | null
  id!: string

  @Input() calendarType: CalendarType = CalendarType.JALALI
  @Input() calendarMode: CalendarMode = CalendarMode.DATEPICKER
  @Input() darkMode: boolean = false
  @Input() primaryColor = '#38b0ac'
  @Input() min!: Moment
  @Input() max!: Moment
  @Input() host!: HTMLElement
  hostElement!: any

  @Input() isPastDisabled: boolean = false
  @Input() showMonthOutOfRangeDays: boolean = false

  @Output() onDateRangeSelect = new EventEmitter<DateRange>
  @Output() onDateSelect = new EventEmitter<Moment>

  selectedDate!: Moment | undefined
  @Input() date!: Moment | string | undefined
  @Input() selectedRange!: DateRange | undefined

  constructor(
    private element: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Self() private control: NgControl,
  ) {

  }

  ngOnInit() {
    this.control?.control?.valueChanges.subscribe(value => {
      this.selectedDate = value ? moment(value) : undefined;
    })

    if (this.date && this.element.nativeElement instanceof HTMLInputElement) {
      this.setDate()
    }
  }


  private setDate() {
    if (typeof this.date === 'string') {
      this.element.nativeElement.value = this.date
    } else {
      this.element.nativeElement.value = this.date?.format('YYYY/MM/DD');
    }
  }

  private clickInside = false;

  a2e(s: any) {
    return s.replace(/[٠-٩]/g, (d: any) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  }

  @HostListener('input', ["$event.target.value"])
  input(value: any) {
    if (this.datepickerRef) {
      this.removeDatepicker()
    }
    value = this.a2e(value);
    if (moment(value).isValid()) {
      this.date = moment(value)
      this.selectedDate = this.date
    }
  }

  @HostListener('click')
  onClick() {
    this.resetVariables()
    this.clickInside = true
    if (this.datepickerRef) {
      this.removeDatepicker()
      return
    }

    if (this.host) {
      this.hostElement = this.host
    } else {
      this.hostElement = this.element.nativeElement;
    }

    this.id = randomStr('amd-datepicker-popup-')
    this.datepickerRef = this.viewContainerRef.createComponent(AmdDatepickerPopupComponent);
    document.body.appendChild(this.datepickerRef.location.nativeElement);

    this.datepickerRef.setInput('id', this.id)

    if (this.calendarType) {
      this.datepickerRef.setInput('calendarType', this.calendarType);
    }
    if (this.calendarMode) {
      this.datepickerRef.setInput('calendarMode', this.calendarMode)
    }
    if (this.darkMode) {
      this.datepickerRef.setInput('darkMode', this.darkMode)
    }
    if (this.primaryColor) {
      this.datepickerRef.setInput('primaryColor', this.primaryColor)
    }
    if (this.date) {
      this.datepickerRef.setInput('date', this.date)
    }
    if (this.selectedDate) {
      this.datepickerRef.setInput('date', this.selectedDate)
    }
    if (this.selectedRange) {
      this.datepickerRef.setInput('dateRange', this.selectedRange);
    }
    if (this.min) {
      this.datepickerRef.setInput('min', this.min)
    }
    if (this.max) {
      this.datepickerRef.setInput('max', this.max)
    }
    if (this.isPastDisabled) {
      this.datepickerRef.setInput('isPastDisabled', this.isPastDisabled)
    }
    if (this.showMonthOutOfRangeDays) {
      this.datepickerRef.setInput('showMonthOutOfRangeDays', this.showMonthOutOfRangeDays)
    }

    this.datepickerRef.instance.onDateSelect.subscribe(val => {
      this.selectedDate = val
      if (this.element.nativeElement instanceof HTMLInputElement) {
        this.element.nativeElement.value = val.format('YYYY/MM/DD');
      }
      if (this.control?.control) {
        this.control.control.setValue(val.format('YYYY/MM/DD'));
      }
      this.onDateSelect.emit(val);
      this.removeDatepicker()
    });

    this.datepickerRef.instance.onDateRangeSelect.subscribe(val => {
      this.selectedRange = val
      this.onDateRangeSelect.emit(val)
      this.element.nativeElement.value = val.startDate.format('YYYY/MM/DD') + ' - ' + val.endDate.format('YYYY/MM/DD');
      this.removeDatepicker()
    });

    this.updateDatepickerPosition()

    setTimeout(() => {
      const element = document.getElementById(this.id)
      if (element) {
        element.onclick = () => {
          this.clickInside = true
        }
      }
    })
  }

  updateDatepickerPosition() {
    const rect = this.hostElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isAboveMidpoint = rect.y < windowHeight / 2;

    const positionTop = isAboveMidpoint ? `${rect.bottom + 4}px` : 'unset';
    const positionBottom = isAboveMidpoint ? 'unset' : `${windowHeight - rect.top + 4}px`;

    this.datepickerRef?.setInput('positionTop', positionTop);
    this.datepickerRef?.setInput('positionBottom', positionBottom);

    const isLtr = document.dir === 'ltr';
    const isRightSide = isLtr ? rect.left > windowWidth / 2 : rect.right > windowWidth / 2;

    const positionLeft = isRightSide ? 'unset' : `${rect.left}px`;
    const positionRight = isRightSide ? `${document.body.offsetWidth - rect.right}px` : 'unset';

    this.datepickerRef?.setInput('positionLeft', positionLeft);
    this.datepickerRef?.setInput('positionRight', positionRight);
  }

  resetVariables() {
    if (this.calendarMode === CalendarMode.DATEPICKER) {
      this.selectedRange = undefined
      return
    }

    if (this.calendarMode === CalendarMode.DATE_RANGE_PICKER) {
      this.selectedDate = undefined
      return;
    }

    if (this.calendarMode === CalendarMode.NORMAL) {
      this.selectedDate = undefined
      this.selectedRange = undefined
      return;
    }
  }

  @HostListener('document:click')
  clickOutside(): void {
    if (!this.clickInside) {
      this.removeDatepicker();
    }
    this.clickInside = false;
  }

  removeDatepicker() {
    this.datepickerRef?.destroy()
    this.datepickerRef = null
  }
}
