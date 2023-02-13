import { ControlValueAccessor } from '@angular/forms';


export abstract class ANgInputFormControl<T = unknown> implements ControlValueAccessor {

  protected onChange:   (val: T)  => void = (val: T)  => { };
  protected onTouched:  ()        => void = ()        => { };

  abstract writeValue(val: T): void;

  setDisabledState?(isDisabled: boolean): void;

  registerOnChange(fn: (val: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
