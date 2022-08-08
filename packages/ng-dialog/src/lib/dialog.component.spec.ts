import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADialogComponent } from './dialog.component';

describe('ADialogComponent', () => {
  let component: ADialogComponent;
  let fixture: ComponentFixture<ADialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
