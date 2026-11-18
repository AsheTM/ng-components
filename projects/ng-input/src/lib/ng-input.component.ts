import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostBinding,
  Self,
  Optional,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ANgInputFormControl } from './ng-input-form-control.class';


@Component({
  selector:         '// PLACEHOLDER',
  template:         '<!-- NgInputComponent PLACEHOLDER -->',
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export abstract class NgInputComponent<T extends string | number | boolean | Date = string>
  extends ANgInputFormControl<T>
  implements OnChanges, OnDestroy, OnInit {

  @Input() @HostBinding('class.block')  block?: boolean;

  @Input() hint?:             string;
  @Input() label?:            string;
  @Input() name?:             string;
  @Input() readonly?:         boolean;
  @Input() required?:         boolean;
  @Input() error:             boolean         = false;
  @Input() maxLength:         number | null   = null;
  @Input() placeholder:       string          = '';
  @Input() set disabled(disabled: boolean | undefined) {
    const coercedDisabled: boolean = coerceBooleanProperty(disabled);

    this.setDisabledState?.(coercedDisabled);
  }
  @Input() set value(val: T) {
    this.writeValue(val);
  }

  @Output() protected readonly blur:    EventEmitter<FocusEvent>
    = new EventEmitter<FocusEvent>();
  @Output() protected readonly focus:   EventEmitter<FocusEvent>
    = new EventEmitter<FocusEvent>();
  @Output() protected readonly keyup:   EventEmitter<KeyboardEvent>
    = new EventEmitter<KeyboardEvent>();

  protected static instancesCount: number = 0;

  readonly formControl!:  FormControl;
  readonly errors$:       BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  readonly isFocused$:    BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);

  autocomplete: 'new-password' | 'off' | 'on' = 'on';
  options:      Array<T>                      = [];

  abstract role: 'button' | 'radio' | 'textbox';
  abstract type: 'text' | 'password' | 'date' | 'select' | 'radio' | 'textarea';

  protected readonly PREFIX_ID: string = 'trafic-shared-input';

  private _i!:                                    number;
  private _formControlValueChangesSubscription?:  Subscription;

  get hasError(): boolean {
    return Boolean(this.formControl.invalid && this.formControl.touched && this.formControl.errors);
  }

  get hasLabel(): boolean {
    return !!this.label;
  }

  get hasValue(): boolean {
    return !!this.value;
  }

  get id(): string {
    return this.PREFIX_ID + '-' + this.type + '__' + this._i;
  }

  get value(): T {
    return this.formControl.value || '';
  }

  constructor(
    @Self()
    @Optional()
      private readonly _ngControl: NgControl
  ) {
    super();

    this._i = NgInputComponent.instancesCount++;
    this._ngControl && (this._ngControl.valueAccessor = this);
    this.formControl = this._ngControl && (this._ngControl.control as FormControl | null) || new FormControl('');
  }

  ngOnChanges({
    block,
    error,
    readonly,
    required
  }: SimpleChanges): void {

    if(!!block) {
      this.block = coerceBooleanProperty(block.currentValue);
    }

    if(!!error) {
      this.error = coerceBooleanProperty(error.currentValue);
    }

    if(!!readonly) {
      this.readonly = coerceBooleanProperty(readonly.currentValue);
    }

    if(!!required) {
      this.required = coerceBooleanProperty(required.currentValue);
    }
  }

  ngOnInit(): void {
    this._formControlValueChangesSubscription = this.formControl.valueChanges
      .subscribe((value: T) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy(): void {
    this._formControlValueChangesSubscription?.unsubscribe();
  }

  writeValue(value: T): void {
    this.formControl.setValue(value);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formControl[isDisabled ? 'disable' : 'enable']();
  }

  onBlurEventHandler($event: FocusEvent): void {
    this.isFocused$.next(false);
    this.onTouched();
    this.blur.emit($event);
  }

  onFocusEventHandler($event: FocusEvent): void {
    this.isFocused$.next(true);
    this.focus.emit($event);
  }

  onKeyupEventHandler($event: KeyboardEvent): void {
    this.keyup.emit($event);
  }

  onChangeEventHandler(arg: Event | string | number): void {
    throw new Error('\'onChangeEventHandler\' not implemented!');
  }

}
