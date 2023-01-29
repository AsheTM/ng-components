import { Component, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DialogFormBodyComponentDirective } from './dialog-form-body-component.directive';

import { ADialogComponent } from '../dialog.component';


@Component({
  selector:         'ashetm-dialog-form',
  templateUrl:      '../dialog.component.html',
  styleUrls:        [
    '../dialog-background-shadow.component.scss',
    '../dialog-fade-animation.component.scss',
    '../dialog.component.scss',
    './dialog-form.component.scss',
  ],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class DialogFormComponent<U = unknown> extends ADialogComponent<DialogFormBodyComponentDirective> implements OnChanges {

  @Output() data: EventEmitter<U> = new EventEmitter<U>();

  readonly type: 'form' = 'form';

  override template!: DialogFormBodyComponentDirective;

  closeLabel!: string;
  okLabel!: string;

  ngOnChanges({ template }: SimpleChanges): void {
    if(!!template && !(template instanceof DialogFormBodyComponentDirective)) {
      throw new Error('\'template\' input provided value is not instance of DialogFormBodyComponentDirective');
    }
  }

  override onOkClickEventHandler(): void {
    const formGroup:  FormGroup = this.template.formGroup;
    const rawValue:   U         = formGroup.getRawValue();

    this.close.emit();
    this.data.emit(rawValue);
  }

}
