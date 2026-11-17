import { Observable, Subject } from 'rxjs';

import { DialogConfirmComponent } from './dialog-confirm.component';

import { DialogRef, TDialogGuard } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogConfirmRef extends DialogRef {

  override readonly type: EDialogType.CONFIRM = EDialogType.CONFIRM;

  private readonly _decisionSubject: Subject<boolean>                 = new Subject<boolean>();
  private readonly _decisionGuards:  TDialogGuard<[boolean]>[]        = [];

  constructor(dialogConfirmComponent: DialogConfirmComponent) {
    super(dialogConfirmComponent);
    dialogConfirmComponent.decision.subscribe((decision: boolean) => this._requestDecision(decision));
  }

  /**
   * Registers a guard executed when the user makes a decision (`true` for ok, `false` for close).
   * The dialog closes only when every decision guard returns `true`.
   * The returned observable emits the decision once, then completes.
   * It completes without emitting when the dialog is closed without a decision (e.g. Escape key).
   */
  onBeforeDecision(fn: TDialogGuard<[boolean]> = () => true): Observable<boolean> {
    this._decisionGuards.push(fn);

    return this._decisionSubject.asObservable();
  }

  protected override _complete(): void {
    super._complete();
    this._decisionSubject.complete();
  }

  private _requestDecision(decision: boolean): void {
    this._perform(this._decisionGuards, [decision], () => this._decisionSubject.next(decision));
  }

}
