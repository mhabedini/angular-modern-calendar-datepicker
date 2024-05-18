import {TestBed} from '@angular/core/testing';
import {JalaliDateService} from "./service/jalali-date-service";
import {DateServiceInterface} from "./service/date-service-interface";

describe('AngularPersianDatepickerService', () => {
  let service: DateServiceInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JalaliDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.daysInMonth('1403/06/04')).toEqual(1)
  });
});
