import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { DialogConfirmComponent } from './dialog-confirm.component';

import { DialogRef } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogConfirmRef extends DialogRef {

  readonly type: EDialogType.CONFIRM = EDialogType.CONFIRM;

  constructor(private readonly _dialogConfirmComponent: DialogConfirmComponent) {
    super(_dialogConfirmComponent);
  }

  onBeforeDecision(fn: (decision: boolean) => boolean = (decision: boolean) => true): Observable<boolean> {
    return this._dialogConfirmComponent.decision
      .pipe(
        filter(fn),
        first()
      );
  }

}
