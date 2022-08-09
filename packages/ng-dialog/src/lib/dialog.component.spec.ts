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
    selector: 'test-dialog-selector',
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

  it('should close event handler work', () => {
    expect(component.close).toBeDefined();
    expect(component.onCloseClickEventHandler).toBeDefined();
    component.close.subscribe(() => {
      expect(component.close.emit).toHaveBeenCalledTimes(1);
    });

    component.onCloseClickEventHandler();
  });
});
