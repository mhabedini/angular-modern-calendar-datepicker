import { TestBed } from '@angular/core/testing';

import { AngularPersianDatepickerService } from './angular-persian-datepicker.service';

describe('AngularPersianDatepickerService', () => {
  let service: AngularPersianDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularPersianDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
