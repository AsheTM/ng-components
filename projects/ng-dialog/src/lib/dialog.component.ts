import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

import { IDialogComponent } from './dialog.interface';


@Component({
  selector: '<!-- DO NOT INSTANCIATE -->',
  template: `<!-- PLACEHOLDER -->`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class ADialogComponent<T extends TemplateRef<unknown> = TemplateRef<any>>
  implements IDialogComponent {

  @HostBinding('class.close') protected classClose = false;

  @Input() title!: string;

  @Input() body?: string;
  @Input() template?: T;

  @Input() abstract closeLabel?: string;
  @Input() abstract okLabel?: string;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  abstract readonly type: 'alert' | 'confirm' | 'form' | 'notification';

  @HostListener('document:keyup.escape')
  onEscapeKeyUpEventListener(): void {
    this.close.emit();
  }

  animateClosingDialog(beforeAnimating?: () => void): Promise<void> {
    this.classClose = true;
    beforeAnimating?.();

    return new Promise((resolve: () => void) => setTimeout(resolve, 300));
  }

  onCloseClickEventHandler(): void {
    this.close.emit();
  }

  onOkClickEventHandler(): void {
    throw new Error(`Method 'onOkClickEventHandler' not implemented`);
  }

}
