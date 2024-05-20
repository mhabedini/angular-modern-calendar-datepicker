import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerTestComponent } from './datepicker-test.component';

describe('DatepickerComponent', () => {
  let component: DatepickerTestComponent;
  let fixture: ComponentFixture<DatepickerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
