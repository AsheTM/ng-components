import { EventEmitter } from '@angular/core';

import { DialogAlertRef } from './dialog-alert';
import { DialogConfirmComponent, DialogConfirmRef } from './dialog-confirm';
import { DialogFormComponent, DialogFormRef } from './dialog-form';
import { ADialogComponent } from './dialog.component';
import { EDialogType } from './dialog.enum';


describe('DialogRef', () => {
  const createComponent = (): ADialogComponent =>
    ({ close: new EventEmitter<void>() } as ADialogComponent);
  const createRef = (component: ADialogComponent = createComponent()): DialogAlertRef =>
    new DialogAlertRef(component);

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

  it('should expose the alert type on alert references', () => {
    expect(createRef().type).toBe(EDialogType.ALERT);
  });

  describe('close', () => {
    let component: ADialogComponent;
    let ref: DialogAlertRef;

    beforeEach(() => {
      component = createComponent();
      ref = createRef(component);
    });

    it('should emit, complete and notify afterClosed when no guard is registered', () => {
      const next: jasmine.Spy = jasmine.createSpy('next');
      const complete: jasmine.Spy = jasmine.createSpy('complete');
      const afterClosed: jasmine.Spy = jasmine.createSpy('afterClosed');

      ref.onBeforeClose().subscribe({ next, complete });
      ref.afterClosed().subscribe(afterClosed);
      component.close.emit();

      expect(next).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledTimes(1);
      expect(afterClosed).toHaveBeenCalledTimes(1);
      expect(ref.closed).toBeTrue();
    });

    it('should stay opened when a guard returns false', () => {
      const next: jasmine.Spy = jasmine.createSpy('next');
      const afterClosed: jasmine.Spy = jasmine.createSpy('afterClosed');

      ref.onBeforeClose(() => false).subscribe(next);
      ref.afterClosed().subscribe(afterClosed);
      component.close.emit();

      expect(next).not.toHaveBeenCalled();
      expect(afterClosed).not.toHaveBeenCalled();
      expect(ref.closed).toBeFalse();
    });

    it('should close only when every guard allows it', () => {
      let allow = false;
      const next: jasmine.Spy = jasmine.createSpy('next');

      ref.onBeforeClose(() => true).subscribe(next);
      ref.onBeforeClose(() => allow);

      component.close.emit();
      expect(next).not.toHaveBeenCalled();

      allow = true;
      component.close.emit();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should ignore close requests once closed', () => {
      const guard: jasmine.Spy = jasmine.createSpy('guard').and.returnValue(true);
      const afterClosed: jasmine.Spy = jasmine.createSpy('afterClosed');

      ref.onBeforeClose(guard);
      ref.afterClosed().subscribe(afterClosed);
      component.close.emit();
      component.close.emit();

      expect(guard).toHaveBeenCalledTimes(1);
      expect(afterClosed).toHaveBeenCalledTimes(1);
    });
  });

  describe('decision', () => {
    let component: DialogConfirmComponent;
    let ref: DialogConfirmRef;

    beforeEach(() => {
      component = { close: new EventEmitter<void>(), decision: new EventEmitter<boolean>() } as DialogConfirmComponent;
      ref = new DialogConfirmRef(component);
    });

    it('should emit the decision and complete every stream', () => {
      const decisions: boolean[] = [];
      const closeNext: jasmine.Spy = jasmine.createSpy('closeNext');
      const closeComplete: jasmine.Spy = jasmine.createSpy('closeComplete');
      const decisionComplete: jasmine.Spy = jasmine.createSpy('decisionComplete');

      ref.onBeforeClose().subscribe({ next: closeNext, complete: closeComplete });
      ref.onBeforeDecision().subscribe({ next: (d: boolean) => decisions.push(d), complete: decisionComplete });
      component.decision.emit(true);

      expect(decisions).toEqual([true]);
      expect(decisionComplete).toHaveBeenCalledTimes(1);
      expect(closeNext).not.toHaveBeenCalled();
      expect(closeComplete).toHaveBeenCalledTimes(1);
    });

    it('should pass the decision to the guard and stay opened when refused', () => {
      const guard: jasmine.Spy = jasmine.createSpy('guard').and.callFake((decision: boolean) => decision);
      const decisions: boolean[] = [];

      ref.onBeforeDecision(guard).subscribe((d: boolean) => decisions.push(d));
      component.decision.emit(false);

      expect(guard).toHaveBeenCalledWith(false);
      expect(decisions).toEqual([]);
      expect(ref.closed).toBeFalse();

      component.decision.emit(true);

      expect(decisions).toEqual([true]);
      expect(ref.closed).toBeTrue();
    });

    it('should complete the decision without value when closed by a close request', () => {
      const next: jasmine.Spy = jasmine.createSpy('next');
      const complete: jasmine.Spy = jasmine.createSpy('complete');

      ref.onBeforeDecision().subscribe({ next, complete });
      component.close.emit();

      expect(next).not.toHaveBeenCalled();
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('data', () => {
    let component: DialogFormComponent<{ name: string }>;
    let ref: DialogFormRef<{ name: string }>;

    beforeEach(() => {
      component = {
        close: new EventEmitter<void>(),
        data: new EventEmitter<{ name: string }>()
      } as DialogFormComponent<{ name: string }>;
      ref = new DialogFormRef<{ name: string }>(component);
    });

    it('should emit the data only when the guard allows it', () => {
      const data: Array<{ name: string }> = [];

      ref.onBeforeData(({ name }: { name: string }) => name.length > 0)
        .subscribe((value: { name: string }) => data.push(value));

      component.data.emit({ name: '' });
      expect(data).toEqual([]);
      expect(ref.closed).toBeFalse();

      component.data.emit({ name: 'John' });
      expect(data).toEqual([{ name: 'John' }]);
      expect(ref.closed).toBeTrue();
    });
  });
});
