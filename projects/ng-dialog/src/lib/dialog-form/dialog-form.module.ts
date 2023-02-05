import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogFormBodyComponentDirective } from './dialog-form-body-component.directive';
import { DialogFormComponent } from './dialog-form.component';


@NgModule({
  declarations: [
    DialogFormComponent,
    DialogFormBodyComponentDirective
  ],
  exports:      [
    DialogFormComponent,
    DialogFormBodyComponentDirective
  ],
  imports:      [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DialogFormModule { }
