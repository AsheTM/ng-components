import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ADialogComponent } from './dialog.component';
import { EDialogType } from './dialog.enum';


export class DialogRef {

  protected static instance = 0;

  readonly type: EDialogType = EDialogType.DEFAULT;

  private readonly _closeSubject: Subject<void> = this._aDialogComponent.close;

  constructor(private readonly _aDialogComponent: ADialogComponent) {
    DialogRef.instance = DialogRef.instance++;
  }

  getInstanceId(): number {
    return DialogRef.instance;
  }

  onBeforeClose(fn: () => boolean = () => true): Observable<void> {
    return this._closeSubject.pipe(
      filter(() => {
        if(fn()) {
          this._closeSubject.complete();

          return true;
        }

        return false;
      })
    );
  }

}
