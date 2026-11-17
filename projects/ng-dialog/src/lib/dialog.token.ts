import { InjectionToken } from '@angular/core';

import { EDialogInstance } from './dialog.enum';


export const DIALOG_TOKEN_INSTANCE: InjectionToken<EDialogInstance>
  = new InjectionToken<EDialogInstance>('DIALOG_TOKEN_INSTANCE');
