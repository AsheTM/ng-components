import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ADialogComponent } from '../dialog.component';


@Component({
  selector:         'ashetm-dialog-confirm',
  templateUrl:      '../dialog.component.html',
  styleUrls:        [
    '../dialog-background-shadow.component.scss',
    '../dialog-fade-animation.component.scss',
    '../dialog.component.scss',
    './dialog-confirm.component.scss'
  ],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class DialogConfirmComponent extends ADialogComponent {

  @Output() decision: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly type: 'confirm' = 'confirm';

  closeLabel!: string;
  okLabel!: string;

  onCloseClickEventHandler(): void {
    this.close.emit();
    this.decision.emit(false);
  }

  onOkClickEventHandler(): void {
    this.close.emit();
    this.decision.emit(true);
  }

}
