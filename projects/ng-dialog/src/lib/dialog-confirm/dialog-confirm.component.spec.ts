import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmComponent } from './dialog-confirm.component';


describe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create confirm type', () => {
    expect(component.decision).toBeDefined();
    expect(component.type).toEqual('confirm');
  });

  it('should emit a positive decision on ok click', () => {
    const decisions: boolean[] = [];

    component.decision.subscribe((decision: boolean) => decisions.push(decision));

    expect(() => component.onOkClickEventHandler()).not.toThrow();
    expect(decisions).toEqual([true]);
  });

  it('should emit a negative decision on close click', () => {
    const decisions: boolean[] = [];

    component.decision.subscribe((decision: boolean) => decisions.push(decision));
    component.onCloseClickEventHandler();

    expect(decisions).toEqual([false]);
  });
});
