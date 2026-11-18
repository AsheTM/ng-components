import { Directive, ElementRef, EmbeddedViewRef, Host, TemplateRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Directive({
  exportAs: 'DialogFormBodyComponent',
  selector: 'ng-template[dialogFormBodyComponent][formGroup]'
})
export class DialogFormBodyComponentDirective<T = any, U = any> extends TemplateRef<T> {

  get currentValue(): U {
    return this.formGroup.getRawValue();
  }

  get formGroup(): FormGroup {
    return this._formGroupDirective.form;
  }

  get elementRef(): ElementRef<T> {
    return this._templateRef.elementRef;
  }

  constructor(
    @Host()
      private readonly _templateRef: TemplateRef<T>,
    @Host()
      private readonly _formGroupDirective: FormGroupDirective
  ) {
    super();
  }

  createEmbeddedView(context: T): EmbeddedViewRef<T> {
    return this._templateRef.createEmbeddedView(context);
  }

}
