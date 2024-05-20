import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatepickerTestModule} from "./datepicker/datepicker-test.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatepickerTestModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
