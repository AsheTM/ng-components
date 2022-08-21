import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ADialogComponent } from '../dialog.component';


@Component({
  selector:         '<!-- DO INSTANCIATE IT -->',
  templateUrl:      '../dialog.component.html',
  styleUrls:        [
    '../dialog-background-shadow.component.scss',
    '../dialog-fade-animation.component.scss',
    '../dialog.component.scss',
    './dialog-alert.component.scss'
  ],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class DialogAlertComponent extends ADialogComponent<never> {

  readonly okLabel:   undefined;
  readonly template:  never | undefined;
  readonly type:      'alert'           = 'alert';

  closeLabel!: string;

}
