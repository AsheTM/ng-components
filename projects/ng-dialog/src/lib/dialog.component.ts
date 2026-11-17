import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

import { DialogStack } from './dialog-stack.service';


const FOCUSABLE_SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- placeholder of an abstract base component, never rendered
  selector: '<!-- DO NOT INSTANCIATE -->',
  template: `<!-- PLACEHOLDER -->`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class ADialogComponent<T extends TemplateRef<unknown> = TemplateRef<any>>
  implements AfterViewInit, OnDestroy, OnInit {

  private static _idCount = 0;

  @HostBinding('class.close') protected classClose = false;

  @Input() title!: string;

  @Input() body?: string;
  @Input() template?: T;

  @Input() closeLabel?: string;
  @Input() okLabel?: string;

  // eslint-disable-next-line @angular-eslint/no-output-native -- public API output, renaming it is a breaking change
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  abstract readonly type: 'alert' | 'confirm' | 'form' | 'notification';

  /** Unique id used to link the dialog to its title and body for assistive technologies. */
  readonly dialogId: string = `ashetm-dialog-${++ADialogComponent._idCount}`;

  private readonly _dialogStack:  DialogStack             = inject(DialogStack);
  private readonly _document:     Document                = inject(DOCUMENT);
  private readonly _elementRef:   ElementRef<HTMLElement> = inject(ElementRef);

  private _previouslyFocusedElement: HTMLElement | null = null;

  /** Alert and confirm dialogs interrupt the user and require a response, a form dialog does not. */
  get role(): 'alertdialog' | 'dialog' {
    return this.type === 'form' ? 'dialog' : 'alertdialog';
  }

  ngOnInit(): void {
    this._dialogStack.push(this);
  }

  ngAfterViewInit(): void {
    const activeElement: Element | null = this._document.activeElement;

    this._previouslyFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;
    (this._getFocusableElements()[0] ?? this._getDialogElement())?.focus();
  }

  ngOnDestroy(): void {
    this._dialogStack.remove(this);
    this._restoreFocus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDownEventListener(event: KeyboardEvent): void {
    if(event.key !== 'Tab') {
      return;
    }

    const focusableElements: HTMLElement[] = this._getFocusableElements();
    const first: HTMLElement | undefined = focusableElements[0];
    const last: HTMLElement | undefined = focusableElements[focusableElements.length - 1];
    const activeElement: Element | null = this._document.activeElement;

    if(!first || !last) {
      event.preventDefault();
    } else if(event.shiftKey && (activeElement === first || !this._elementRef.nativeElement.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if(!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  @HostListener('document:keyup.escape')
  onEscapeKeyUpEventListener(): void {
    if(this._dialogStack.isTopMost(this)) {
      this.close.emit();
    }
  }

  animateClosingDialog(beforeAnimating?: () => void): Promise<void> {
    this._dialogStack.remove(this);
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

  private _getDialogElement(): HTMLElement | null {
    return this._elementRef.nativeElement.querySelector<HTMLElement>('.dialog');
  }

  private _getFocusableElements(): HTMLElement[] {
    return Array.from(this._elementRef.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  }

  private _restoreFocus(): void {
    if(this._previouslyFocusedElement?.isConnected) {
      this._previouslyFocusedElement.focus();
    }

    this._previouslyFocusedElement = null;
  }

}
