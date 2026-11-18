import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFilter, CoerciveBoolean, ControlErrors } from '@ashetm/ng-utility';

import { NgInputComponent } from '../ng-input.component';


@Component({
  exportAs:         'NgInputRadio',
  selector:         `
    ashetm-ng-input[name][type="radio"],
    ashetm-ng-input-radio[name]
  `,
  templateUrl:      '../ng-input.component.html',
  styleUrls:        [
    './ng-input-radio.component.scss',
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
export class NgInputRadio extends NgInputComponent<boolean | number | string>
  implements OnChanges, OnDestroy, OnInit {

  readonly role: 'radio' = 'radio';
  readonly type: 'radio' = 'radio';

  name!: string;

  get disabled() {
    return this.formControl.disabled;
  }

  set disabled(disabled: boolean | undefined) {
    const coercedDisabled: boolean = coerceBooleanProperty(disabled);

    this.setDisabledState?.(coercedDisabled);
  }

  get value(): string | boolean {
    return this._value;
  }

  set value(value: string | boolean) {
    this._value = value;
  }

  private _value!: string | boolean;

  ngOnChanges({ label, placeholder }: SimpleChanges): void {
    if(label || placeholder) {
      this.placeholder = label.currentValue || placeholder.currentValue;
      this.label = null as never;
    }
  }

  onChangeEventHandler($event: Event): void {
    const { value }: HTMLInputElement = ($event as unknown as Record<'target', HTMLInputElement>).target;

    this.formControl.patchValue(value === undefined + '' ? null : value);
  }

  onKeyupEventHandler(...args: any): void {
    throw new Error('\'onKeyupEventHandler\' not implemented!');
  }

}
