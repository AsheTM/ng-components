import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  ElementRef
} from '@angular/core';

import { EDialogButtonType } from './dialog-button.enum';


@Component({
  selector:         'button[dialogButton]',
  template:         `<ng-content></ng-content>`,
  styleUrls:        ['./dialog-button.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class DialogButtonComponent {

  @HostBinding('tabindex')  private readonly _tabindex: number    = 0;
  @HostBinding('role')      private readonly _role: 'button'  = 'button';

  @Input('dialogButton') set dialogButton(type: EDialogButtonType) {
    const { classList }: HTMLElement = this._elementRef.nativeElement;

    if(type) {
      classList.remove(this._currentType);
      classList.add(this._currentType = type);
    } else if(!classList.contains(this.DEFAULT_TYPE)) {
      classList.add(this.DEFAULT_TYPE);
    }
  }
  @Input()  @HostBinding('class.disabled')    disabled?: boolean;
  @Input()  @HostBinding('class.is-loading')  loading?: boolean;

  private readonly DEFAULT_TYPE: EDialogButtonType = EDialogButtonType.DEFAULT;

  private _currentType: EDialogButtonType = this.DEFAULT_TYPE;

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) { }

}
