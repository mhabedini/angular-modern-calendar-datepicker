import {NgModule} from "@angular/core";
import {AmdDatepickerDirective} from "./amd-datepicker.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AmdDatepickerDirective
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [AmdDatepickerDirective]
})
export class AmdDatepickerDirectiveModule {
}
