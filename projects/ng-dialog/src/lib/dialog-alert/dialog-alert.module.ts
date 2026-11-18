import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogAlertComponent } from './dialog-alert.component';


@NgModule({
  declarations: [DialogAlertComponent],
  exports:      [DialogAlertComponent],
  imports:      [CommonModule]
})
export class DialogAlertModule { }
