import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputDate } from './ng-input-date.component';

describe('NgInputDate', () => {
  let component: NgInputDate;
  let fixture: ComponentFixture<NgInputDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgInputDate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
