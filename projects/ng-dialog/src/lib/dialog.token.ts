import { InjectionToken } from "@angular/core";

import { EDialogInstance } from "./dialog.enum";
import { TDialogRootConfigurationColor } from "./dialog.type";


export const DIALOG_TOKEN_COLOR: InjectionToken<TDialogRootConfigurationColor>
  = new InjectionToken<TDialogRootConfigurationColor>('DIALOG_TOKEN_COLOR');
export const DIALOG_TOKEN_INSTANCE: InjectionToken<EDialogInstance>
  = new InjectionToken<EDialogInstance>('DIALOG_TOKEN_INSTANCE');
