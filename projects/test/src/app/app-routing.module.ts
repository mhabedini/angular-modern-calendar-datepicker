import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatepickerComponent} from "./datepicker/datepicker.component";

const routes: Routes = [{
  path: '',
  component: DatepickerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
