import { TestBed } from '@angular/core/testing';

import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';


fdescribe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule.forRoot()],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
