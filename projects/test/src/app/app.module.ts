import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatepickerTestComponent} from "./datepicker/datepicker-test.component";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    DatepickerTestComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
