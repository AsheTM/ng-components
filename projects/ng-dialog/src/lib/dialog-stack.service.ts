import { Injectable } from '@angular/core';


/**
 * Keeps track of the opened dialogs, in opening order.
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class DialogStack<T = unknown> {

  private readonly _dialogs: T[] = [];

  push(dialog: T): void {
    this.remove(dialog);
    this._dialogs.push(dialog);
  }

  remove(dialog: T): void {
    const index: number = this._dialogs.indexOf(dialog);

    if(index !== -1) {
      this._dialogs.splice(index, 1);
    }
  }

  isTopMost(dialog: T): boolean {
    return this._dialogs[this._dialogs.length - 1] === dialog;
  }

}
