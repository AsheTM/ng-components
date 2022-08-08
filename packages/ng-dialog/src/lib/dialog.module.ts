import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { DialogRootModule } from './dialog-root.module';
import { EDialogInstance } from './dialog.enum';
import { DialogService } from './dialog.service';
import { DIALOG_TOKEN_COLOR, DIALOG_TOKEN_INSTANCE } from './dialog.token';
import { TDialogRootConfiguration } from './dialog.type';


@NgModule({
  providers:    [{
    provide:  DIALOG_TOKEN_INSTANCE,
    useValue: EDialogInstance.NO_STATIC_FOR_ROOT_METHOD_INVOKED
  }]
})
export class DialogModule {

  constructor(
    @Inject(DIALOG_TOKEN_INSTANCE)
      private readonly _ashetmDialogTokenInstance: EDialogInstance
  ) {
    if(_ashetmDialogTokenInstance === EDialogInstance.NO_STATIC_FOR_ROOT_METHOD_INVOKED) {
      throw new Error(`'${this.constructor.name}.forRoot' static method must be called`);
    }
  }

  static forRoot({
    color
  }: TDialogRootConfiguration = {
    color: {
      background: { },
      text: { }
    }
  }): ModuleWithProviders<DialogRootModule> {
    return {
      ngModule:   DialogRootModule,
      providers:  [
        {
          provide:  DIALOG_TOKEN_INSTANCE,
          useValue: EDialogInstance.FOR_ROOT
        }, {
          provide: DIALOG_TOKEN_COLOR,
          useValue: {
            ...color
          }
        },

        DialogService
      ]
    };
  }

}
