import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AmdDatepickerPopupComponent} from './amd-datepicker-popup.component';
import {AmdDatepickerModule} from "../datepicker/amd-datepicker.module";


@NgModule({
  declarations: [
    AmdDatepickerPopupComponent
  ],
  imports: [
    CommonModule,
    AmdDatepickerModule,
  ],
  exports: [AmdDatepickerPopupComponent]
})
export class AmdDatepickerPopupModule { }
