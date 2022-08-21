import { InjectionToken } from "@angular/core";

import { EWalletInstance } from "./wallet.enum";


export const WALLET_INSTANCE: InjectionToken<EWalletInstance>
  = new InjectionToken<EWalletInstance>('WALLET_INSTANCE');
