import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  Type
} from '@angular/core';

import { ADialogComponent } from './dialog.component';
import { DialogRef } from './dialog-ref.class';
import { TDialogAlertLabels, TDialogLabels } from './dialog.type';

import { DialogAlertComponent, DialogAlertRef } from './dialog-alert';
import { DialogConfirmComponent, DialogConfirmRef } from './dialog-confirm';
import { DialogFormComponent, DialogFormRef } from './dialog-form';


const DIALOG_ALERT_DEFAULT_LABELS:   Required<TDialogAlertLabels> = { closeLabel: 'Okey!' };
const DIALOG_CONFIRM_DEFAULT_LABELS: Required<TDialogLabels>      = { closeLabel: 'Close', okLabel: 'Okey' };
const DIALOG_FORM_DEFAULT_LABELS:    Required<TDialogLabels>      = { closeLabel: 'Cancel', okLabel: 'Submit' };


@Injectable()
export class DialogService {

  constructor(
    private readonly _applicationRef: ApplicationRef,
    private readonly _environmentInjector: EnvironmentInjector,
    private readonly _injector: Injector,
    @Inject(DOCUMENT)
      private readonly _document: Document
  ) { }

  openDialogAlert(title: string, body?: string, labels: TDialogAlertLabels = {}): DialogAlertRef {
    const { closeLabel }: Required<TDialogAlertLabels> = { ...DIALOG_ALERT_DEFAULT_LABELS, ...labels };

    return this._open(
      DialogAlertComponent,
      (component: DialogAlertComponent) => new DialogAlertRef(component),
      { body, closeLabel, title }
    );
  }

  openDialogConfirm(title: string, body?: string, labels: TDialogLabels = {}): DialogConfirmRef {
    const { closeLabel, okLabel }: Required<TDialogLabels> = { ...DIALOG_CONFIRM_DEFAULT_LABELS, ...labels };

    return this._open(
      DialogConfirmComponent,
      (component: DialogConfirmComponent) => new DialogConfirmRef(component),
      { body, closeLabel, okLabel, title }
    );
  }

  openDialogForm<T extends TemplateRef<unknown>, U = any>(
    title: string,
    template: T,
    labels: TDialogLabels = {}
  ): DialogFormRef<U> {
    const { closeLabel, okLabel }: Required<TDialogLabels> = { ...DIALOG_FORM_DEFAULT_LABELS, ...labels };

    return this._open<DialogFormComponent<U>, DialogFormRef<U>>(
      DialogFormComponent as Type<DialogFormComponent<U>>,
      (component: DialogFormComponent<U>) => new DialogFormRef<U>(component),
      { closeLabel, okLabel, template, title }
    );
  }

  private _open<T extends ADialogComponent, R extends DialogRef>(
    component: Type<T>,
    createDialogRef: (component: T) => R,
    inputs: Record<string, unknown>
  ): R {
    const componentRef: ComponentRef<T> = createComponent(component, {
      environmentInjector:  this._environmentInjector,
      elementInjector:      this._injector
    });
    const dialogRef: R = createDialogRef(componentRef.instance);

    Object.entries(inputs).forEach(([name, value]: [string, unknown]) => componentRef.setInput(name, value));
    // Appended before the first change detection, so that the dialog can take the focus once rendered.
    this._document.body.appendChild(componentRef.location.nativeElement);
    this._applicationRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
    dialogRef.afterClosed().subscribe(() => this._destroy(componentRef));

    return dialogRef;
  }

  private async _destroy<T extends ADialogComponent>(componentRef: ComponentRef<T>): Promise<void> {
    await componentRef.instance.animateClosingDialog(() => componentRef.changeDetectorRef.detectChanges());

    // Destroying the component detaches its view from the application and removes its host element.
    componentRef.destroy();
  }

}
