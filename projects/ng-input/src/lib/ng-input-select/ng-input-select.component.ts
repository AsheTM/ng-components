import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFilter, CoerciveBoolean, ControlErrors } from '@ashetm/ng-utility';

import { NgInputComponent } from '../ng-input.component';


@Component({
  exportAs:         'NgInputSelect',
  selector:         `
    ashetm-ng-select[options],
    ashetm-ng-input-select[options]
  `,
  templateUrl:      '../ng-input.component.html',
  styleUrls:        [
    './ng-input-select.component.scss',
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
export class NgInputSelect extends NgInputComponent<string | number>
  implements OnChanges, OnDestroy, OnInit {

  @Input() options!: Array<string | number>;

  readonly autocomplete:  'off'     = 'off';
  readonly role:          'button'  = 'button';
  readonly type:          'select'  = 'select';

  /**
   *  @override
   *  @param {string | number} $event
   */
  onBlurEventHandler($event: FocusEvent): void {
    setTimeout(() => {
      const optionProposition:  string[]  = (this.value ? this.options.filter((val: string | number) => {
        const stringVal: string = String(val);

        return !this.value || stringVal.includes(String(this.value));
      }) : []).map(String);
      const option:             string    = optionProposition.length === 1 ? optionProposition[0] : '';

      super.onBlurEventHandler($event);

      this.formControl.patchValue(option);
      this.formControl.updateValueAndValidity();
      this.onChange(option);
    }, 300);
  }

  /**
   *  @override
   *  @param {string | number} $event
   */
  onChangeEventHandler($event: Event |string | number): void {
    this.formControl.patchValue($event as string | number);
    this.formControl.updateValueAndValidity();
    this.onChange($event as string | number);
  }

}
