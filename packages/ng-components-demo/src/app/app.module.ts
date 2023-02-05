import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { DialogModule } from "@ashetm/ng-dialog";

import { AppComponent } from "./app.component";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DialogModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AppModule { }
