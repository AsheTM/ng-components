import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogConfirmComponent } from './dialog-confirm.component';


@NgModule({
  declarations: [DialogConfirmComponent],
  exports:      [DialogConfirmComponent],
  imports:      [CommonModule]
})
export class DialogConfirmModule { }
