import { NgModule } from '@angular/core';

import { DialogAlertModule } from './dialog-alert';
import { DialogConfirmModule } from './dialog-confirm';
import { DialogFormModule } from './dialog-form';


@NgModule({
  exports: [
    DialogAlertModule,
    DialogConfirmModule,
    DialogFormModule
  ]
})
export class DialogRootModule { }
