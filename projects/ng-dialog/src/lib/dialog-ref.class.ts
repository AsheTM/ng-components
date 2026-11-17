import { Observable, Subject } from 'rxjs';

import { ADialogComponent } from './dialog.component';
import { EDialogType } from './dialog.enum';


/**
 * A guard is executed before an action (close, decision, data) is performed.
 * The action is performed only when every registered guard returns `true`.
 */
export type TDialogGuard<T extends unknown[] = []> = (...args: T) => boolean;

export abstract class DialogRef {

  private static _instanceCount = 0;

  readonly type: EDialogType = EDialogType.DEFAULT;

  private readonly _instanceId: number = ++DialogRef._instanceCount;

  private readonly _afterClosedSubject: Subject<void> = new Subject<void>();
  private readonly _closeSubject:       Subject<void> = new Subject<void>();
  private readonly _closeGuards:        TDialogGuard[] = [];

  private _closed = false;

  constructor(dialogComponent: ADialogComponent) {
    dialogComponent.close.subscribe(() => this._requestClose());
  }

  /** Whether the dialog has already been closed. */
  get closed(): boolean {
    return this._closed;
  }

  getInstanceId(): number {
    return this._instanceId;
  }

  /**
   * Notifies once the dialog is closed, whatever the reason (close, decision, data), then completes.
   */
  afterClosed(): Observable<void> {
    return this._afterClosedSubject.asObservable();
  }

  /**
   * Registers a guard executed when the user requests to close the dialog (close button, Escape key).
   * The dialog closes only when every close guard returns `true`.
   * The returned observable emits once when the dialog is closed through a close request, then completes.
   * It completes without emitting when the dialog is closed by another action.
   */
  onBeforeClose(fn: TDialogGuard = () => true): Observable<void> {
    this._closeGuards.push(fn);

    return this._closeSubject.asObservable();
  }

  /**
   * Performs an action if every guard allows it: emits the action result,
   * then closes the dialog and completes every stream of this reference.
   */
  protected _perform<T extends unknown[]>(guards: TDialogGuard<T>[], args: T, emit: () => void): void {
    if(this._closed || !guards.every((guard: TDialogGuard<T>) => guard(...args))) {
      return;
    }

    this._closed = true;
    emit();
    this._complete();
    this._afterClosedSubject.next();
    this._afterClosedSubject.complete();
  }

  /** Completes every stream exposed by this reference. Override to complete additional streams. */
  protected _complete(): void {
    this._closeSubject.complete();
  }

  private _requestClose(): void {
    this._perform(this._closeGuards, [], () => this._closeSubject.next());
  }

}
