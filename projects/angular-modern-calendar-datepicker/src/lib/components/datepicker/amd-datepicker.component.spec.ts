import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdDatepickerComponent } from './amd-datepicker.component';

describe('DatepickerComponent', () => {
  let component: AmdDatepickerComponent;
  let fixture: ComponentFixture<AmdDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmdDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmdDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
