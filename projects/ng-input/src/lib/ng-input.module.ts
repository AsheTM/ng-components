import { NgModule } from '@angular/core';

import { NgInputDate } from './ng-input-date';
import { NgInputRadio } from './ng-input-radio';
import { NgInputSelect } from './ng-input-select';
import { NgInputText } from './ng-input-text';
import { NgInputTextarea } from './ng-input-textarea';


@NgModule({
  exports: [
    NgInputDate,
    NgInputRadio,
    NgInputSelect,
    NgInputText,
    NgInputTextarea
  ],
  imports: [
    NgInputDate,
    NgInputRadio,
    NgInputSelect,
    NgInputText,
    NgInputTextarea
  ]
})
export class NgInputModule { }
