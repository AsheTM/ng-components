import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputTextarea } from './ng-input-textarea.component';

describe('InputTextarea', () => {
  let component: NgInputTextarea;
  let fixture: ComponentFixture<NgInputTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgInputTextarea ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
