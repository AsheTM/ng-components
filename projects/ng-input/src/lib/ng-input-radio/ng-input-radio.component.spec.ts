import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputRadio } from './ng-input-radio.component';

describe('NgInputRadio', () => {
  let component: NgInputRadio;
  let fixture: ComponentFixture<NgInputRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgInputRadio ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
