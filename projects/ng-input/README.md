# @ashetm/ng-input

Standalone Angular form inputs sharing one look: text, textarea, select, radio and date. Every input works as a form control with reactive and template-driven forms.

*Requires Angular 14 or above (Angular 14 line).*

## Install

```bash
npm install @ashetm/ng-input @ashetm/ng-utility @angular/cdk
```

## Import

Every input is a standalone component; import the ones you need, or `NgInputModule` for all of them.

```ts
import { NgInputModule } from '@ashetm/ng-input';

@NgModule({
  imports: [NgInputModule, ReactiveFormsModule]
})
export class AppModule { }
```

## Inputs

| Component | Selectors | Value type |
| --- | --- | --- |
| `NgInputText` | `ashetm-ng-input`, `ashetm-ng-input-text` | `string` |
| `NgInputTextarea` | `ashetm-ng-input-textarea`, `ashetm-ng-input[type=textarea]`, `ashetm-ng-textarea` | `string` |
| `NgInputSelect` | `ashetm-ng-input-select[options]`, `ashetm-ng-select[options]` | `string \| number` |
| `NgInputRadio` | `ashetm-ng-input-radio[name]`, `ashetm-ng-input[name][type=radio]` | `boolean \| number \| string` |
| `NgInputDate` | `ashetm-ng-input-date`, `ashetm-ng-input[type=date]` | `Date \| string` |

Common inputs: `label`, `placeholder`, `hint`, `name`, `required`, `readonly`, `disabled`, `error`, `maxLength`, `block`, `value`.
Common outputs: `blur`, `focus`, `keyup`.

Validation errors of the bound form control are displayed once the control is touched.

## Usage

```html
<form [formGroup]="formGroup">
  <ashetm-ng-input-text formControlName="name" label="Name" required></ashetm-ng-input-text>
  <ashetm-ng-input-select formControlName="country" label="Country" [options]="countries"></ashetm-ng-input-select>
  <ashetm-ng-input-date formControlName="birthday" label="Birthday"></ashetm-ng-input-date>
</form>
```
