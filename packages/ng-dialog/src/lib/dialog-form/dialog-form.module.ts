import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogFormBodyComponentDirective } from './dialog-form-body-component.directive';
import { DialogFormComponent } from './dialog-form.component';

import { DialogCommonModule } from '../dialog-common.module';


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
    ReactiveFormsModule,

    DialogCommonModule
  ]
})
export class DialogFormModule { }
