import { NgModule } from '@angular/core';

import { DialogConfirmComponent } from './dialog-confirm.component';

import { DialogCommonModule } from '../dialog-common.module';


@NgModule({
  declarations: [DialogConfirmComponent],
  exports:      [DialogConfirmComponent],
  imports:      [DialogCommonModule]
})
export class DialogConfirmModule { }
