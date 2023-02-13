import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnChanges, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFilter, CoerciveBoolean, ControlErrors } from '@ashetm/ng-utility';

import { NgInputComponent } from '../ng-input.component';


@Component({
  exportAs:         'NgInputTextarea',
  selector:         `
  ashetm-ng-input-textarea,
  ashetm-ng-input[type=textarea],
  ashetm-ng-textarea
  `,
  templateUrl:      '../ng-input.component.html',
  styleUrls:        [
    './ng-input-textarea.component.scss',
    '../ng-input.component.scss'
  ],
  changeDetection:  ChangeDetectionStrategy.OnPush,
  imports:          [
    ArrayFilter,
    CoerciveBoolean,
    CommonModule,
    ControlErrors,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone:       true
})
export class NgInputTextarea extends NgInputComponent<string>
  implements OnChanges, OnDestroy, OnInit {

  readonly block: true        = true;
  readonly role:  'textbox'   = 'textbox';
  readonly type:  'textarea'  = 'textarea';

}
