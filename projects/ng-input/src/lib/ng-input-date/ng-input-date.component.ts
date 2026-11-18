import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFilter, CoerciveBoolean, ControlErrors } from '@ashetm/ng-utility';

import { NgInputComponent } from '../ng-input.component';


@Component({
  exportAs:         'NgInputDate',
  selector:         `
    ashetm-ng-input[type="date"],
    ashetm-ng-input-date
  `,
  templateUrl:      '../ng-input.component.html',
  styleUrls:        [
    './ng-input-date.component.scss',
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
export class NgInputDate extends NgInputComponent<Date | string>
  implements OnChanges, OnDestroy, OnInit {

  override readonly role: 'textbox' = 'textbox';
  override readonly type: 'date'    = 'date';

}
