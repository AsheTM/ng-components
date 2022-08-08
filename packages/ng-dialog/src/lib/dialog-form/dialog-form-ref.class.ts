import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { DialogFormComponent } from './dialog-form.component';

import { DialogRef } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogFormRef<T> extends DialogRef {

  readonly type: EDialogType.FORM = EDialogType.FORM;

  constructor(private readonly _dialogFormComponent: DialogFormComponent<T>) {
    super(_dialogFormComponent);
  }

  onBeforeData(fn: (data: T) => boolean = (_: T) => true): Observable<T> {
    return this._dialogFormComponent.data
      .pipe(
        filter(fn),
        first()
      );
  }

}
