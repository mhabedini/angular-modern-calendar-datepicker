import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmdDatepickerComponent } from './amd-datepicker.component';
import {UiScrollModule} from "ngx-ui-scroll";



@NgModule({
  declarations: [
    AmdDatepickerComponent
  ],
  imports: [
    CommonModule,
    UiScrollModule
  ],
  exports: [AmdDatepickerComponent]
})
export class AmdDatepickerModule { }
