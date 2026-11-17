import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DialogConfirmRef } from './dialog-confirm';
import { DialogFormBodyComponentDirective, DialogFormRef } from './dialog-form';
import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';


@Component({
  template: `
    <ng-template dialogFormBodyComponent [formGroup]="formGroup">
      <input formControlName="name" />
    </ng-template>
  `
})
class HostComponent {
  @ViewChild(DialogFormBodyComponentDirective, { static: true })
    template!: DialogFormBodyComponentDirective;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('Sample name')
  });
}


describe('DialogService', () => {
  let service: DialogService;

  const dialogs = (): NodeListOf<HTMLElement> =>
    document.body.querySelectorAll('ashetm-dialog-alert, ashetm-dialog-confirm, ashetm-dialog-form');
  const click = (dialog: Element, selector: string): void =>
    (dialog.querySelector(selector) as HTMLButtonElement).click();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports:      [DialogModule.forRoot(), ReactiveFormsModule]
    });
    service = TestBed.inject(DialogService);
  });

  afterEach(() => dialogs().forEach((dialog: HTMLElement) => dialog.remove()));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should render an alert and remove it once closed', fakeAsync(() => {
    service.openDialogAlert('Title', 'Body');

    expect(dialogs().length).toBe(1);
    expect(dialogs()[0].textContent).toContain('Title');

    click(dialogs()[0], 'button.secondary');
    flush();

    expect(dialogs().length).toBe(0);
  }));

  it('should keep the alert opened while the close guard refuses', fakeAsync(() => {
    service.openDialogAlert('Title').onBeforeClose(() => false);

    click(dialogs()[0], 'button.secondary');
    flush();

    expect(dialogs().length).toBe(1);
  }));

  it('should emit the confirm decision and remove the dialog', fakeAsync(() => {
    const ref: DialogConfirmRef = service.openDialogConfirm('Title', 'Body');
    const decisions: boolean[] = [];

    ref.onBeforeDecision().subscribe((decision: boolean) => decisions.push(decision));
    click(dialogs()[0], 'button.primary');
    flush();

    expect(decisions).toEqual([true]);
    expect(dialogs().length).toBe(0);
  }));

  it('should emit a negative decision on the confirm close button', fakeAsync(() => {
    const ref: DialogConfirmRef = service.openDialogConfirm('Title', 'Body');
    const decisions: boolean[] = [];

    ref.onBeforeDecision().subscribe((decision: boolean) => decisions.push(decision));
    click(dialogs()[0], 'button.secondary');
    flush();

    expect(decisions).toEqual([false]);
    expect(dialogs().length).toBe(0);
  }));

  it('should emit the form data and tear down only once on repeated clicks', fakeAsync(() => {
    const host: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);

    host.detectChanges();

    const ref: DialogFormRef<{ name: string }> = service.openDialogForm('Title', host.componentInstance.template);
    const data: Array<{ name: string }> = [];

    ref.onBeforeData().subscribe((value: { name: string }) => data.push(value));

    const dialog: HTMLElement = dialogs()[0];

    click(dialog, 'button.primary');
    click(dialog, 'button.secondary');
    expect(() => flush()).not.toThrow();

    expect(data).toEqual([{ name: 'Sample name' }]);
    expect(dialogs().length).toBe(0);
  }));
});
