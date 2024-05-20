import {TestBed} from '@angular/core/testing';
import {JalaliDatepicker} from "./datepicker/jalali-datepicker";

describe('AngularPersianDatepickerService', () => {
  let service: JalaliDatepicker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JalaliDatepicker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
