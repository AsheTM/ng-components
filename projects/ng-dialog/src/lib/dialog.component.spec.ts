import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADialogComponent } from './dialog.component';


describe('ADialogComponent', () => {
  const closeLabel = 'closeLabel';
  const okLabel = 'okLabel';
  const title = 'title';
  const type = '';
  let component: ADialogComponent;
  let fixture: ComponentFixture<ADialogComponent>;

  @Component({
    selector: 'ashetm-test-dialog',
    template: ''
  })
  class DialogComponent extends ADialogComponent {
    readonly closeLabel: string = closeLabel;
    readonly okLabel: string = okLabel;
    readonly type: 'alert' | 'confirm' | 'form' | 'notification' = type as any;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.title = title;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.closeLabel).toEqual(closeLabel);
    expect(component.okLabel).toEqual(okLabel);
    expect(component.title).toEqual(title);
    expect(component.type).toEqual(type);
  });

  it('should emit close once on close click', () => {
    const closeSpy: jasmine.Spy = jasmine.createSpy('close');

    component.close.subscribe(closeSpy);
    component.onCloseClickEventHandler();

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw on ok click when not implemented', () => {
    expect(() => component.onOkClickEventHandler()).toThrowError(/not implemented/);
  });
});
