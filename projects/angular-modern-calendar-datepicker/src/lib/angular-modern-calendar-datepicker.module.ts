import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AmdDatepickerComponent} from './components/datepicker/amd-datepicker.component';
import {AmdDatepickerPopupComponent} from './components/datepicker-popup/amd-datepicker-popup.component';
import {AmdDatepickerDirective} from './directives/amd-datepicker.directive';

@NgModule({
  imports: [
    ReactiveFormsModule,
    AmdDatepickerComponent,
    AmdDatepickerPopupComponent,
    AmdDatepickerDirective
  ],
  exports: [
    AmdDatepickerComponent,
    AmdDatepickerPopupComponent,
    AmdDatepickerDirective
  ]
})
export class AngularModernCalendarDatepickerModule { }