import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogButtonModule } from './dialog-button';


@NgModule({
  exports: [
    CommonModule,
    DialogButtonModule
  ]
})
export class DialogCommonModule { }
