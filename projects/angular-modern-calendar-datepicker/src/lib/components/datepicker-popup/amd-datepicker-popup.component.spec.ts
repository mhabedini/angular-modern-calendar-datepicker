import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdDatepickerPopupComponent } from './amd-datepicker-popup.component';

describe('DatepickerPopupComponent', () => {
  let component: AmdDatepickerPopupComponent;
  let fixture: ComponentFixture<AmdDatepickerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AmdDatepickerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmdDatepickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
