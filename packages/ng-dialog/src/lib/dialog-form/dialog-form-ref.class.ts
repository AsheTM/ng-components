import { Observable, Subject } from 'rxjs';

import { DialogFormComponent } from './dialog-form.component';

import { DialogRef } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogFormRef<T> extends DialogRef {

  override readonly type: EDialogType.FORM = EDialogType.FORM;

  private readonly _dataSubject: Subject<T> = this._dialogFormComponent.data;

  protected override _maxEvent = 2;

  constructor(private readonly _dialogFormComponent: DialogFormComponent<T>) {
    super(_dialogFormComponent);
  }

  onBeforeData(fn: (data: T) => boolean = (_: T) => true): Observable<T> {
    this._incrementEventCount();

    return this._dataSubject.pipe(this._checkAllowanceEvent(fn, () => this._dataSubject.complete()));
  }

}
