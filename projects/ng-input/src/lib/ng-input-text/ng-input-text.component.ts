import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFilter, CoerciveBoolean, ControlErrors } from '@ashetm/ng-utility';

import { NgInputComponent } from '../ng-input.component';


@Component({
  exportAs:         'NgInputText',
  selector:         `
    ashetm-ng-input,
    ashetm-ng-input-text
  `,
  templateUrl:      '../ng-input.component.html',
  styleUrls:        [
    './ng-input-text.component.scss',
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
export class NgInputText extends NgInputComponent<string>
  implements OnChanges, OnDestroy, OnInit {

  readonly role: 'textbox'  = 'textbox';
  readonly type: 'text'     = 'text';

}
