import { Observable, Subject } from 'rxjs';

import { DialogFormComponent } from './dialog-form.component';

import { DialogRef, TDialogGuard } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogFormRef<T> extends DialogRef {

  override readonly type: EDialogType.FORM = EDialogType.FORM;

  private readonly _dataSubject: Subject<T>         = new Subject<T>();
  private readonly _dataGuards:  TDialogGuard<[T]>[] = [];

  constructor(dialogFormComponent: DialogFormComponent<T>) {
    super(dialogFormComponent);
    dialogFormComponent.data.subscribe((data: T) => this._requestData(data));
  }

  /**
   * Registers a guard executed when the user submits the form, with the raw value of the form.
   * The dialog closes only when every data guard returns `true`.
   * The returned observable emits the data once, then completes.
   * It completes without emitting when the dialog is closed without submitting.
   */
  onBeforeData(fn: TDialogGuard<[T]> = () => true): Observable<T> {
    this._dataGuards.push(fn);

    return this._dataSubject.asObservable();
  }

  protected override _complete(): void {
    super._complete();
    this._dataSubject.complete();
  }

  private _requestData(data: T): void {
    this._perform(this._dataGuards, [data], () => this._dataSubject.next(data));
  }

}
