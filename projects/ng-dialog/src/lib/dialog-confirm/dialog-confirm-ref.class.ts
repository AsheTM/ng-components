import { Observable, Subject } from 'rxjs';

import { DialogConfirmComponent } from './dialog-confirm.component';

import { DialogRef } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogConfirmRef extends DialogRef {

  override readonly type: EDialogType.CONFIRM = EDialogType.CONFIRM;

  private readonly _decisionSubject: Subject<boolean> = this._dialogConfirmComponent.decision;

  protected override _maxEvent = 2;

  constructor(private readonly _dialogConfirmComponent: DialogConfirmComponent) {
    super(_dialogConfirmComponent);
  }

  onBeforeDecision(fn: (decision: boolean) => boolean = (decision: boolean) => true): Observable<boolean> {
    this._incrementEventCount();

    return this._decisionSubject.pipe(this._checkAllowanceEvent(fn, () => this._decisionSubject.complete()));
  }

}
