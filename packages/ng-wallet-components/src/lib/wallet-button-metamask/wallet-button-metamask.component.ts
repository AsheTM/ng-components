import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { EtherProviderService, ETHER_TOKEN_IS_METAMASK_WALLET, ETHER_TOKEN_IS_WALLET_INSTALLED } from '@ashetm/ng-ether';
import { Observable, shareReplay, tap } from 'rxjs';

import { AWalletButtonComponent } from '../wallet-button';


@Component({
  exportAs: 'WalletButtonMetamask',
  selector: `button[wallet-button-metamask]`,
  template: `
  <ng-container *ngSwitch="true">
    <ng-template [ngSwitchCase]="isWalletNotInstalled">
      <img alt="Metamask logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
        srcset="" /> not installed
    </ng-template>
    <ng-template [ngSwitchCase]="!(connect$ | async)">
      Connect your <img alt="Metamask logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
        srcset="" /> MetaMask Wallet
    </ng-template>
    <ng-template [ngSwitchDefault>
      Connected
    </ng-template>
  </ng-container>
  `,
  styleUrls: [
    '../wallet-button/wallet-button.component.scss',
    './wallet-button-metamask.component.scss'
  ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletButtonMetamaskComponent extends AWalletButtonComponent {

  connect$: Observable<boolean> = this._etherProviderService.connect$
    .pipe(tap((isConnected: boolean) => this.isConnected = isConnected));

  get isWalletNotInstalled(): boolean {
    return this._etherTokenIsMetaMaskWallet && this._etherTokenIsWalletInstalled;
  }

  constructor(
    @Inject(ETHER_TOKEN_IS_WALLET_INSTALLED)
      private readonly _etherTokenIsWalletInstalled: boolean,
    @Inject(ETHER_TOKEN_IS_METAMASK_WALLET)
      private readonly _etherTokenIsMetaMaskWallet: boolean,
    private readonly _etherProviderService: EtherProviderService
  ) {
    super();
  }

  protected connectHandler(): void {
    if(!this.isConnected) {
      this._etherProviderService.connectWallet()
        .subscribe({
          next: ([account]: string[]) => this.connect.next(account)
        }).unsubscribe();
    }
  }

}
