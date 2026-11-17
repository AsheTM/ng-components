import { DOCUMENT } from '@angular/common';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';

import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';


describe('DialogService with an injected document', () => {
  let customDocument: Document;
  let service: DialogService;

  beforeEach(() => {
    customDocument = document.implementation.createHTMLDocument('custom');

    TestBed.configureTestingModule({
      imports:   [DialogModule.forRoot()],
      providers: [{ provide: DOCUMENT, useValue: customDocument }]
    });
    service = TestBed.inject(DialogService);
  });

  it('should attach dialogs to the injected document only', fakeAsync(() => {
    service.openDialogAlert('Title').onBeforeClose();

    expect(customDocument.body.querySelector('ashetm-dialog-alert')).not.toBeNull();
    expect(document.body.querySelector('ashetm-dialog-alert')).toBeNull();

    (customDocument.body.querySelector('button.secondary') as HTMLButtonElement).click();
    flush();

    expect(customDocument.body.querySelector('ashetm-dialog-alert')).toBeNull();
  }));
});
