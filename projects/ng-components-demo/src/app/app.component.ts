import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogFormBodyComponentDirective } from '@ashetm/ng-dialog';

import { AppDialogService } from './app-dialog.service';
import { TAppDialogFormData } from './app-dialog.type';


@Component({
  selector: 'ashetm-ng-components-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppDialogService],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  formGroup: FormGroup = this._appDialogService.formGroupApp;

  constructor(private readonly _appDialogService: AppDialogService) { }

  openAlert(): void {
    this._appDialogService.openAlert();
  }

  openConfirm(): void {
    this._appDialogService.openConfirm();
  }

  openForm(template: DialogFormBodyComponentDirective<any, TAppDialogFormData>): void {
    this._appDialogService.openForm(template);
  }

}
