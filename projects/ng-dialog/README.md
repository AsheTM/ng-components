# @ashetm/ng-dialog

This library provides a unique UI for 3 types of dialog: alert, confirm and form.

*Requires Angular 14.1 or above (Angular 14 line).*

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-dialog
```

## Import

You only need to import ``DialogModule`` through ``forRoot`` static method.

```ts
...
import { DialogModule } from '@ashetm/ng-dialog';
...
@NgModule({
  ...
  imports: [
    ...
    DialogModule.forRoot(), 
    ...
  ]
  ...
})
export class AppModule { }
```

## Accessibility

- alert and confirm dialogs use ``role="alertdialog"``, form dialogs use ``role="dialog"``, all with ``aria-modal="true"``
- the dialog is labelled by its title and described by its body
- the focus moves to the first focusable element when the dialog opens, stays trapped inside it while it is opened, and goes back to the previously focused element once it is closed
- the Escape key requests to close the top-most dialog only

## Usage

### Guards and events

Each ``onBeforeX(fn)`` method registers a guard ``fn`` and returns an observable:

- the action (close, decision or data) is performed only when **every** guard registered for it returns ``true``, otherwise the dialog stays opened
- the observable emits the value of the action once, then completes
- once the dialog is closed, every observable of its reference completes; the ones of the actions that were not performed complete without emitting (e.g. ``onBeforeDecision`` when the confirm dialog is closed with the Escape key)

### DialogAlert

The service to use is ``DialogService#openDialogAlert``, its definition is:

```d.ts
openDialogAlert(
  title: string, 
  body?: string, 
  labels?: TDialogAlertLabels
): DialogAlertRef;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *body*, is the body of dialog (OPTIONAL) (DEFAULT - '')
- 3rd argument *labels*, is an object with an optional closeLabel key to override the label of close button (OPTIONAL) (DEFAULT - closeLabel = 'OK')

And it returns the dialog reference ``DialogAlertRef``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'alert'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog alert if it returns true, else it stays opened
- ``afterClosed()`` returns ``Observable<void>`` that emits once the dialog is closed, whatever the reason, then completes
- ``closed`` returns ``true`` once the dialog is closed

Example:

```ts
constructor(
  ...
  private readonly _dialogService: DialogService
  ...
) { }

openAlert(): void {
  this._dialogService.openDialogAlert('Sample Title');
}
```

### DialogConfirm

The service to use is ``DialogService#openDialogConfirm``, its definition is:

```d.ts
openDialogConfirm(
  title: string, 
  body?: string, 
  labels?: TDialogLabels
): DialogConfirmRef;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *body*, is the body of dialog (OPTIONAL) (DEFAULT - '')
- 3rd argument *labels*, is an object with optional closeLabel and okLabel keys to override the label of close and ok buttons, each omitted label keeps its default (OPTIONAL) (DEFAULT - closeLabel = 'Close', okLabel = 'OK')

And it returns the dialog reference ``DialogConfirmRef``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'confirm'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog if it returns true, else it stays opened
- ``onBeforeDecision(fn: (decision: boolean) => boolean = (decision: boolean) => true)`` returns ``Observable<boolean>`` observable that returns the decision made by the user/client (``true`` for ok, ``false`` for close) and can pass a function handler to execute before closing, close the dialog if it returns true else it stays opened
- ``afterClosed()`` returns ``Observable<void>`` that emits once the dialog is closed, whatever the reason, then completes
- ``closed`` returns ``true`` once the dialog is closed

Example:

```ts
constructor(
  ...
  private readonly _dialogService: DialogService
  ...
) { }

openConfirm(): void {
  this._dialogService.openDialogConfirm('Sample Title');
}
```

### DialogForm

The service to use is ``DialogService#openDialogForm``, its definition is:

```d.ts
openDialogForm<T extends TemplateRef<unknown>, U = any>(
  title: string, 
  template: T, 
  labels?: TDialogLabels
): DialogFormRef<U>;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *template*, is the body template of dialog (REQUIRED)
- 3rd argument *labels*, is an object with optional closeLabel and okLabel keys to override the label of close and ok buttons, each omitted label keeps its default (OPTIONAL) (DEFAULT - closeLabel = 'Cancel', okLabel = 'Submit')

And it returns the dialog reference ``DialogFormRef<U>``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'form'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog if it returns true, else it stays opened
- ``onBeforeData(fn: (data: U) => boolean = (_: U) => true)`` returns ``Observable<U>`` observable that returns the data of the form written by the user/client and can pass a function handler to execute before closing, close the dialog if it returns true else it stays opened
- ``afterClosed()`` returns ``Observable<void>`` that emits once the dialog is closed, whatever the reason, then completes
- ``closed`` returns ``true`` once the dialog is closed

It also needs to tag ``ng-template`` with the directive ``dialogFormBodyComponent``, that requires also to bind ``formGroup`` directive. And also take reference of that ``ng-template`` as ``DialogFormBodyComponent``.

Example:

```html
...
<ng-template #dialogFormBodyComponent="DialogFormBodyComponent" 
  dialogFormBodyComponent
  [formGroup]="formGroup">
  Name: <input formControlName="name" />
</ng-template>
```

```ts
...
formGroup: FormGroup = new FormGroup({
  name: new FormControl('Sample name')
});
...
constructor(
  ...
  private readonly _dialogService: DialogService
  ...
) { }

openForm(template: DialogFormBodyComponentDirective): void {
  this._dialogService.openDialogForm('Sample Title', template);
}
```
