import { NgModule } from '@angular/core';
import { EtherModule } from '@ashetm/ng-ether';

import { WalletButtonMetamaskModule } from './wallet-button-metamask';


@NgModule({
  exports: [
    EtherModule,
    WalletButtonMetamaskModule
  ],
  imports: [
    EtherModule.forRoot()
  ]
})
export class WalletRootModule { }
