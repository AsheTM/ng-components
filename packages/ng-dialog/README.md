# @ashetm/ng-dialog

This library provide a unique UI of 3 types of dialog; alert, confirm and form.

*Only Angular 14 and above are available.*
<!-- ### LOOKING FOR MAINTAINER. PLEASE PING [@voronianski](https://twitter.com/voronianski)! -->

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->


<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

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

## Usage

### DialogAlert

The serviec to use is ``DialogService#openDialogAlert``, it's definition is:

```d.ts
openDialogAlert(
  title: string, 
  body?: string, 
  { closeLabel }?: Record<'closeLabel', string>
): DialogRef;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *body*, is the body of dialog (OPTIONAL) (DEFAULT - '')
- 3rd argument *buttons*, is an object with closeLabel key to override the label of close button (OPTIONAL) (DEFAULT - closeLabel = 'Okey!)

And it returns dialog reference ``DialogRef``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'alert'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog alert if it returns true, else it stays opened

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

The serviec to use is ``DialogService#openDialogConfirm``, it's definition is:

```d.ts
openDialogConfirm(
  title: string, 
  body?: string, 
  { closeLabel, okLabel }?: Record<'closeLabel' | 'okLabel', string>
): DialogConfirmRef;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *body*, is the body of dialog (OPTIONAL) (DEFAULT - '')
- 3rd argument *buttons*, is an object with closeLabel and okLabel keys to override the label of close button and okLabel (OPTIONAL) (DEFAULT - closeLabel = 'Close, okLabel = 'Okey')

And it returns dialog reference ``DialogConfirmRef``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'confirm'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog if it returns true, else it stays opened
- ``onBeforeDecision(fn: (decision: boolean) => boolean = (decision: boolean) => true)`` returns ``Observable<boolean>`` observable that returns the decision made by the user/client and can pass a function handler to execute before closing, close the dialog if it returns true etlse it stays opened

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

The service to use is ``DialogService#openDialogForm``, it's definition is:

```d.ts
openDialogForm<T extends TemplateRef<unknown>, U = any>(
  title: string, 
  template: T, 
  { closeLabel, okLabel }?: Record<'closeLabel' | 'okLabel', string>
): DialogFormRef<U>;
```

- 1st argument *title*, is the title of dialog (REQUIRED)
- 2nd argument *template*, is the body template of dialog (REQUIRED)
- 3rd argument *buttons*, is an object with closeLabel and okLabel keys to override the label of close button and okLabel (OPTIONAL) (DEFAULT - closeLabel = 'Cancel, okLabel = 'Submit')

And it returns dialog reference ``DialogFormRef<U>``, here is the exposed members:

- ``type`` returns an ``EDialogType`` value with value of 'alert'
- ``getInstanceId()`` returns a ``number`` of instance id
- ``onBeforeClose(fn: () => boolean = () => true)`` returns ``Observable<void>`` and can pass a function handler to execute before closing, close the dialog alert if it returns true, else it stays opened
- ``onBeforeData(fn: (data: U) => boolean = (_: U) => true)`` returns ``Observable<U>`` observable that returns the data of the form written by the user/client and can pass a function handler to execute before closing, close the dialog if it returns true etlse it stays opened

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
