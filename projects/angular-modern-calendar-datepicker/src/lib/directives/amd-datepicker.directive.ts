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
    componentRef!: ComponentRef<AmdDatepickerPopupComponent> | null
    host!: any
    id!: string

    @Input() calendarType: CalendarType = CalendarType.JALALI
    @Input() calendarMode: CalendarMode = CalendarMode.DATEPICKER
    @Input() darkMode: boolean = false
    @Input() primaryColor = '#38b0ac'
    @Input() min!: Moment
    @Input() max!: Moment

    @Input() isPastDisabled: boolean = false
    @Input() showMonthOutOfRangeDays: boolean = false

    @Output() onDateRangeSelect = new EventEmitter<DateRange>
    @Output() onDateSelect = new EventEmitter<Moment>

    selectedDate!: Moment | undefined
    @Input() date!: Moment | string | undefined
    @Input() selectedRange!: DateRange | undefined

    constructor(private element: ElementRef, private viewContainerRef: ViewContainerRef, @Optional() @Self() private control: NgControl) {

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
        if (this.componentRef) {
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
        if (this.componentRef) {
            this.removeDatepicker()
            return
        }

        this.host = this.element.nativeElement
        this.id = randomStr('adp-datepicker-popup-')
        this.componentRef = this.viewContainerRef.createComponent(AmdDatepickerPopupComponent);
        const rect = this.host.getBoundingClientRect();
        this.componentRef.setInput('id', this.id)

        if (this.calendarType) {
            this.componentRef.setInput('calendarType', this.calendarType);
        }
        if (this.calendarMode) {
            this.componentRef.setInput('calendarMode', this.calendarMode)
        }
        if (this.darkMode) {
            this.componentRef.setInput('darkMode', this.darkMode)
        }
        if (this.primaryColor) {
            this.componentRef.setInput('primaryColor', this.primaryColor)
        }
        if (this.date) {
            this.componentRef.setInput('date', this.date)
        }
        if (this.selectedDate) {
            this.componentRef.setInput('date', this.selectedDate)
        }
        if (this.selectedRange) {
            this.componentRef.setInput('dateRange', this.selectedRange);
        }
        if (this.min) {
            this.componentRef.setInput('min', this.min)
        }
        if (this.max) {
            this.componentRef.setInput('max', this.max)
        }
        if (this.isPastDisabled) {
            this.componentRef.setInput('isPastDisabled', this.isPastDisabled)
        }
        if (this.showMonthOutOfRangeDays) {
            this.componentRef.setInput('showMonthOutOfRangeDays', this.showMonthOutOfRangeDays)
        }

        this.componentRef.instance.onDateSelect.subscribe(val => {
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

        this.componentRef.instance.onDateRangeSelect.subscribe(val => {
            this.selectedRange = val
            this.onDateRangeSelect.emit(val)
            this.element.nativeElement.value = val.startDate.format('YYYY/MM/DD') + ' - ' + val.endDate.format('YYYY/MM/DD');
            this.removeDatepicker()
        });

        if (window.innerHeight < rect.bottom + 468) {
            this.componentRef.setInput('positionBottom', window.innerHeight - rect.top + 8)
            this.componentRef.setInput('positionTop', 'unset')
        } else {
            this.componentRef.setInput('positionTop', rect.bottom + 8);
            this.componentRef.setInput('positionBottom', 'unset');
        }

        if (document.dir === 'rtl') {
            this.componentRef.setInput('positionRight', document.body.clientWidth - rect.right);
            this.componentRef.setInput('positionLeft', 'unset');
        } else {
            this.componentRef.setInput('positionLeft', rect.left);
            this.componentRef.setInput('positionRight', 'unset');
        }
        this.host.before(this.componentRef.location.nativeElement);


        setTimeout(() => {
            const element = document.getElementById(this.id)
            if (element) {
                element.onclick = () => {
                    this.clickInside = true
                }
            }
        })
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
        this.componentRef?.destroy()
        this.componentRef = null
    }
}
