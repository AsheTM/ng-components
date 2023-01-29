import { MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ADialogComponent } from './dialog.component';
import { EDialogType } from './dialog.enum';


export abstract class DialogRef {

  protected static instance = 0;

  readonly type: EDialogType = EDialogType.DEFAULT;

  private readonly _closeSubject: Subject<void> = this._aDialogComponent.close;

  protected abstract _maxEvent: number;

  private _eventCount = 0;

  constructor(private readonly _aDialogComponent: ADialogComponent) {
    DialogRef.instance = DialogRef.instance++;
  }

  getInstanceId(): number {
    return DialogRef.instance;
  }

  onBeforeClose(fn: () => boolean = () => true): Observable<void> {
    this._incrementEventCount();

    return this._closeSubject.pipe(this._checkAllowanceEvent(fn, () => this._closeSubject.complete()));
  }

  protected _checkAllowanceEvent<T>(
    checkFunction :(...args: any[]) => boolean,
    success?: () => void
  ): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(filter((...args: any[]) => {
      const allow: boolean = checkFunction(...args) || this._allowIfNoManyEvent();

        if(allow) {
          success?.();

          return true;
        }

        return false;
      }));
  }

  protected _incrementEventCount(): void {
    this._eventCount++;
  }

  private _allowIfNoManyEvent(): boolean {
    return this._eventCount <= this._maxEvent;
  }

}
