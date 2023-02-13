import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputText } from './ng-input-text.component';

describe('NgInputText', () => {
  let component: NgInputText;
  let fixture: ComponentFixture<NgInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgInputText ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
