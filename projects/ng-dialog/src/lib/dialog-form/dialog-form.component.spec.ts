import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DialogFormBodyComponentDirective } from './dialog-form-body-component.directive';
import { DialogFormComponent } from './dialog-form.component';


@Component({
  template: `
    <ng-template dialogFormBodyComponent [formGroup]="formGroup">
      <input formControlName="name" />
    </ng-template>
  `
})
class HostComponent {
  @ViewChild(DialogFormBodyComponentDirective, { static: true })
    template!: DialogFormBodyComponentDirective;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('Sample name')
  });
}


describe('DialogFormComponent', () => {
  let component: DialogFormComponent<{ name: string }>;
  let fixture: ComponentFixture<DialogFormComponent<{ name: string }>>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogFormBodyComponentDirective, DialogFormComponent, HostComponent],
      imports:      [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    const hostFixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);

    hostFixture.detectChanges();
    host = hostFixture.componentInstance;

    fixture = TestBed.createComponent<DialogFormComponent<{ name: string }>>(DialogFormComponent);
    component = fixture.componentInstance;
    component.template = host.template;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form type', () => {
    expect(component.data).toBeDefined();
    expect(component.type).toEqual('form');
  });

  it('should emit the raw value of the form on ok click', () => {
    const data: Array<{ name: string }> = [];

    component.data.subscribe((value: { name: string }) => data.push(value));

    expect(() => component.onOkClickEventHandler()).not.toThrow();
    expect(data).toEqual([{ name: 'Sample name' }]);
  });
});
