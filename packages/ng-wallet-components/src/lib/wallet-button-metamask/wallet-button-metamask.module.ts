import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletButtonMetamaskComponent } from './wallet-button-metamask.component';


@NgModule({
  declarations: [WalletButtonMetamaskComponent],
  exports: [WalletButtonMetamaskComponent],
  imports: [CommonModule]
})
export class WalletButtonMetamaskModule { }
