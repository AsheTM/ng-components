import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { ADialogComponent } from './dialog.component';
import { EDialogType } from './dialog.enum';


export class DialogRef {

  protected static instance = 0;

  readonly type: EDialogType = EDialogType.DEFAULT;

  constructor(private readonly _aDialogComponent: ADialogComponent) {
    DialogRef.instance = DialogRef.instance++;
  }

  getInstanceId(): number {
    return DialogRef.instance;
  }

  onBeforeClose(fn: () => boolean = () => true): Observable<void> {
    return this._aDialogComponent.close.pipe(
      filter(fn),
      first()
    );
  }

}
