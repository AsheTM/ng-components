import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { WalletRootModule } from './wallet-root.module';
import { EWalletInstance } from './wallet.enum';
import { WALLET_INSTANCE } from './wallet.token';


@NgModule({
  providers: [{
    provide: WALLET_INSTANCE,
    useValue: EWalletInstance.NO_STATIC_FOR_ROOT_METHOD_INVOKED
  }]
})
export class WalletModule {

  constructor(
    @Inject(WALLET_INSTANCE)
      private readonly _walletInstance: EWalletInstance
  ) {
    if(_walletInstance === EWalletInstance.NO_STATIC_FOR_ROOT_METHOD_INVOKED) {
      throw new Error(`'${this.constructor.name}.forRoot' static method must be called`);
    }
  }

  static forRoot(): ModuleWithProviders<WalletRootModule> {
    return {
      ngModule: WalletRootModule,
      providers: [
        {
          provide: WALLET_INSTANCE,
          useValue: EWalletInstance.FOR_ROOT
        }
      ]
    };
  }
}
