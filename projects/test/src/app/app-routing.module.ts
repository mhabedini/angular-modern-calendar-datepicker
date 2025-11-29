import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatepickerTestComponent} from "./datepicker/datepicker-test.component";

const routes: Routes = [{
  path: '',
  component: DatepickerTestComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes), DatepickerTestComponent],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
