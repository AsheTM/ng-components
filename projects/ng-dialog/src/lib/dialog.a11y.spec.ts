import { TestBed, fakeAsync, flush } from '@angular/core/testing';

import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';


describe('Dialog accessibility', () => {
  let service: DialogService;
  let opener: HTMLButtonElement;

  const panel = (): HTMLElement => document.body.querySelector('.dialog') as HTMLElement;
  const buttons = (): HTMLButtonElement[] => Array.from(panel().querySelectorAll('button'));
  const tab = (shiftKey = false): KeyboardEvent => {
    const event: KeyboardEvent = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Tab', shiftKey });

    (document.activeElement as HTMLElement).dispatchEvent(event);

    return event;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DialogModule.forRoot()] });
    service = TestBed.inject(DialogService);

    opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();
  });

  afterEach(() => {
    opener.remove();
    document.body.querySelectorAll('ashetm-dialog-alert, ashetm-dialog-confirm').forEach((dialog: Element) => dialog.remove());
  });

  it('should expose dialog semantics linked to the title and body', () => {
    service.openDialogConfirm('Title', 'Body');

    const title: HTMLElement = panel().querySelector('.dialog-header') as HTMLElement;
    const body: HTMLElement = panel().querySelector('.dialog-body') as HTMLElement;

    expect(panel().getAttribute('role')).toBe('alertdialog');
    expect(panel().getAttribute('aria-modal')).toBe('true');
    expect(panel().getAttribute('aria-labelledby')).toBe(title.id);
    expect(panel().getAttribute('aria-describedby')).toBe(body.id);
    expect(title.id).not.toBe('');
  });

  it('should render native buttons without redundant attributes', () => {
    service.openDialogConfirm('Title', 'Body');

    buttons().forEach((button: HTMLButtonElement) => {
      expect(button.getAttribute('type')).toBe('button');
      expect(button.hasAttribute('role')).toBeFalse();
      expect(button.hasAttribute('tabindex')).toBeFalse();
    });
  });

  it('should move the focus into the dialog when opened', () => {
    service.openDialogConfirm('Title', 'Body');

    expect(document.activeElement).toBe(buttons()[0]);
  });

  it('should trap the focus inside the dialog', () => {
    service.openDialogConfirm('Title', 'Body');

    const [first, last]: HTMLButtonElement[] = buttons();

    last.focus();
    expect(tab().defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(first);

    expect(tab(true).defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(last);
  });

  it('should restore the focus to the previously focused element once closed', fakeAsync(() => {
    service.openDialogAlert('Title');

    buttons()[0].click();
    flush();

    expect(document.activeElement).toBe(opener);
  }));
});
