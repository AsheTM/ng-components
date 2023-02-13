import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputSelect } from './ng-input-select.component';

describe('NgInputSelect', () => {
  let component: NgInputSelect;
  let fixture: ComponentFixture<NgInputSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgInputSelect ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
