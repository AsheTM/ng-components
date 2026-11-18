import { DialogRef } from '../dialog-ref.class';
import { EDialogType } from '../dialog.enum';


export class DialogAlertRef extends DialogRef {

  override readonly type: EDialogType.ALERT = EDialogType.ALERT;

}
