import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertComponent } from './dialog-alert.component';


fdescribe('DialogAlertComponent', () => {
  let component: DialogAlertComponent;
  let fixture: ComponentFixture<DialogAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAlertComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DialogAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create alert type', () => {
    expect(component.okLabel).toBeUndefined();
    expect(component.template).toBeUndefined();
    expect(component.type).toEqual('alert');
  });
});
