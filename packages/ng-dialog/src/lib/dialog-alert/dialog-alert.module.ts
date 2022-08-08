import { NgModule } from '@angular/core';

import { DialogAlertComponent } from './dialog-alert.component';

import { DialogCommonModule } from '../dialog-common.module';


@NgModule({
  declarations: [DialogAlertComponent],
  exports:      [DialogAlertComponent],
  imports:      [DialogCommonModule]
})
export class DialogAlertModule { }
