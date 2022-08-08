import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogButtonComponent } from './dialog-button.component';


@NgModule({
  declarations: [DialogButtonComponent],
  exports:      [DialogButtonComponent],
  imports:      [CommonModule]
})
export class DialogButtonModule { }
