import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPersianDatepickerComponent } from './angular-persian-datepicker.component';

describe('AngularPersianDatepickerComponent', () => {
  let component: AngularPersianDatepickerComponent;
  let fixture: ComponentFixture<AngularPersianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPersianDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularPersianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
