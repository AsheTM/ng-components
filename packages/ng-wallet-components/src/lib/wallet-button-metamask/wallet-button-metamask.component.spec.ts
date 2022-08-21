import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletButtonMetamaskComponent } from './wallet-button-metamask.component';

describe('WalletButtonMetamaskComponent', () => {
  let component: WalletButtonMetamaskComponent;
  let fixture: ComponentFixture<WalletButtonMetamaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletButtonMetamaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletButtonMetamaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
