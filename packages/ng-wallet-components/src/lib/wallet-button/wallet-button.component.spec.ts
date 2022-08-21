import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AWalletButtonComponent } from './wallet-button.component';

describe('WalletButtonComponent', () => {
  let component: AWalletButtonComponent;
  let fixture: ComponentFixture<AWalletButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AWalletButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AWalletButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
