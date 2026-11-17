import { DOCUMENT } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  TemplateRef,
  Type
} from '@angular/core';

import { ADialogComponent } from './dialog.component';
import { IDialogComponent } from './dialog.interface';
import { TDialogAlertLabels, TDialogLabels } from './dialog.type';

import { DialogAlertComponent, DialogAlertRef } from './dialog-alert';
import { DialogConfirmComponent, DialogConfirmRef } from './dialog-confirm';
import { DialogFormComponent, DialogFormRef } from './dialog-form';


const DIALOG_ALERT_DEFAULT_LABELS:   Required<TDialogAlertLabels> = { closeLabel: 'Okey!' };
const DIALOG_CONFIRM_DEFAULT_LABELS: Required<TDialogLabels>      = { closeLabel: 'Close', okLabel: 'Okey' };
const DIALOG_FORM_DEFAULT_LABELS:    Required<TDialogLabels>      = { closeLabel: 'Cancel', okLabel: 'Submit' };


@Injectable()
export class DialogService {

  private readonly _destroyedComponentRefs: WeakSet<ComponentRef<unknown>> = new WeakSet<ComponentRef<unknown>>();

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _injector: Injector
  ) { }

  openDialogAlert(title: string, body?: string, labels: TDialogAlertLabels = {}): DialogAlertRef {
    const { closeLabel }: Required<TDialogAlertLabels> = { ...DIALOG_ALERT_DEFAULT_LABELS, ...labels };
    const componentRef: ComponentRef<DialogAlertComponent>
      = this._createComponentRef(DialogAlertComponent);
    const sharedDialogAlertRef: DialogAlertRef
      = new DialogAlertRef(componentRef.instance);

    this._initInputs(componentRef, { body, closeLabel, title });
    this._bindToDocument(componentRef);
    sharedDialogAlertRef.afterClosed().subscribe(() => this._destroy(componentRef));

    return sharedDialogAlertRef;
  }

  openDialogConfirm(title: string, body?: string, labels: TDialogLabels = {}): DialogConfirmRef {
    const { closeLabel, okLabel }: Required<TDialogLabels> = { ...DIALOG_CONFIRM_DEFAULT_LABELS, ...labels };
    const componentRef: ComponentRef<DialogConfirmComponent>
      = this._createComponentRef(DialogConfirmComponent);
    const sharedDialogConfirmRef: DialogConfirmRef
      = new DialogConfirmRef(componentRef.instance);

    this._initInputs(componentRef, { body, closeLabel, okLabel, title });
    this._bindToDocument(componentRef);
    sharedDialogConfirmRef.afterClosed().subscribe(() => this._destroy(componentRef));

    return sharedDialogConfirmRef;
  }

  openDialogForm<T extends TemplateRef<unknown>, U = any>(
    title: string,
    template: T,
    labels: TDialogLabels = {}
  ): DialogFormRef<U> {
    const { closeLabel, okLabel }: Required<TDialogLabels> = { ...DIALOG_FORM_DEFAULT_LABELS, ...labels };
    const sharedDialogFormComponentRef: ComponentRef<DialogFormComponent<U>>
      = this._createComponentRef(DialogFormComponent as any);
    const sharedDialogFormRef: DialogFormRef<U>
      = new DialogFormRef<U>(sharedDialogFormComponentRef.instance);

    this._initInputs(sharedDialogFormComponentRef, { closeLabel, okLabel, template, title });
    this._bindToDocument(sharedDialogFormComponentRef);
    sharedDialogFormRef.afterClosed().subscribe(() => this._destroy(sharedDialogFormComponentRef));

    return sharedDialogFormRef;
  }

  private _createComponentRef<T extends IDialogComponent>(
    component: Type<T>
  ): ComponentRef<T> {
    const componentFactory: ComponentFactory<T>
      = this._componentFactoryResolver.resolveComponentFactory<T>(component);

    return componentFactory.create(this._injector);
  }

  private _initInputs<T extends IDialogComponent>(
    componentRef: ComponentRef<T>,
    inputs: Record<string, any>
  ): void {
    Object.keys(inputs).forEach((key: string) => (componentRef.instance as any)[key] = inputs[key]);
    componentRef.changeDetectorRef.detectChanges();
  }

  private _bindToDocument<T extends IDialogComponent>(
    componentRef: ComponentRef<T>
  ): void {
    document.body.appendChild((componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0]);
  }

  private async _destroy<T extends ADialogComponent>(
    componentRef: ComponentRef<T>
  ): Promise<void> {
    if(this._destroyedComponentRefs.has(componentRef)) {
      return;
    }

    this._destroyedComponentRefs.add(componentRef);
    await this._animateClosingDialog(componentRef);
    this._removeFromDocument(componentRef);
    componentRef.destroy();
  }

  private async _animateClosingDialog<T extends ADialogComponent>(
    componentRef: ComponentRef<T>
  ): Promise<void> {
    await componentRef.instance.animateClosingDialog(() => {
      componentRef.changeDetectorRef.detectChanges();
    });
  }

  private _removeFromDocument<T extends IDialogComponent>(
    componentRef: ComponentRef<T>
  ): void {
    document.body.removeChild((componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0]);
  }

}
