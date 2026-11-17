import { EventEmitter } from '@angular/core';

import { DialogAlertRef } from './dialog-alert';
import { ADialogComponent } from './dialog.component';


describe('DialogRef', () => {
  const createRef = (): DialogAlertRef =>
    new DialogAlertRef({ close: new EventEmitter<void>() } as ADialogComponent);

  it('should give each reference a unique incrementing id', () => {
    const first: DialogAlertRef = createRef();
    const second: DialogAlertRef = createRef();

    expect(first.getInstanceId()).toBeGreaterThan(0);
    expect(second.getInstanceId()).toBe(first.getInstanceId() + 1);
  });

  it('should keep a stable id for a given reference', () => {
    const ref: DialogAlertRef = createRef();
    const id: number = ref.getInstanceId();

    createRef();

    expect(ref.getInstanceId()).toBe(id);
  });
});
