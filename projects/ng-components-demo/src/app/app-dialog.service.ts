import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DialogConfirmRef, DialogFormBodyComponentDirective, DialogFormRef, DialogService } from '@ashetm/ng-dialog';
import { TAppDialogFormData } from "./app-dialog.type";


@Injectable()
export class AppDialogService {

  formGroupApp: FormGroup = new FormGroup({
    text: new FormControl('Init value')
  });

  constructor(private readonly _dialogService: DialogService) { }

  openAlert(): void {
    this._dialogService.openDialogAlert(
      'Alert Title',
      'Check console before closing the alert dialog!'
    ).onBeforeClose(() => {
      console.log('Alert dialog before closing!');

      return false;
    }).subscribe({
      complete: () => {
        console.log('Alert dialog closed successfully!');
      }
    });
  }

  openConfirm(): void {
    const dialogConfirmRef: DialogConfirmRef = this._dialogService.openDialogConfirm(
      'Confirm Title',
      'Check console your decision before either cancel or confirm'
    );

    dialogConfirmRef.onBeforeClose(() => {
      console.log('Confirm dialog before closing!');

      return true;
    }).subscribe({
      complete: () => {
        console.log('Confirm dialog closed successfully!');
      }
    });

    dialogConfirmRef.onBeforeDecision((decision: boolean) => {
      console.log('Confirm decision: ', { decision });

      return true;
    }).subscribe({
      complete: () => {
        console.log('Confirm decision returned successfully!');
      }
    });
  }

  openForm(template: DialogFormBodyComponentDirective<any, TAppDialogFormData>): void {
    const dialogFormRef: DialogFormRef<TAppDialogFormData>
      = this._dialogService.openDialogForm(
        'Form Title',
        template
      );

    dialogFormRef.onBeforeClose(() => {
      console.log('Form dialog before closing!');

      return true;
    }).subscribe({
      complete: () => {
        console.log('Form dialog closed successfully!');
      }
    });

    dialogFormRef.onBeforeData((data: TAppDialogFormData) => {
      console.log('Form data: ', { data });

      return true;
    }).subscribe({
      complete: () => {
        console.log('Form data returned successfully!');
      }
    });
  }

}
