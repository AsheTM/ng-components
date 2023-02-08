import { TestBed } from '@angular/core/testing';

import { NgInputService } from './ng-input.service';

describe('NgInputService', () => {
  let service: NgInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
