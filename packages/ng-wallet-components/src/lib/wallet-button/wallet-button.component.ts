import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';


@Component({
  selector:         '<!-- DO NOT INSTANCIATE IN HTML VIEW -->',
  template:         '',
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export abstract class AWalletButtonComponent {

  @HostBinding('role')            role:     'button'  = 'button';
  @HostBinding('tabindex')        tabindex: 0         = 0;
  @HostBinding('class.disabled')  isConnected         = false;
  @HostBinding('class.disabled')
  abstract isWalletNotInstalled: boolean;

  @HostBinding('class.loading')
  @Input()
  loading = false;

  @Output() connect: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click')
  onClickEventHandler(): void {
    this.connectHandler();
  }

  protected abstract connectHandler(): void;

}
