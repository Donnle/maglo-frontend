import { Component } from '@angular/core';
import { DialogWrapperComponent } from '../../wrappers/dialog-wrapper/dialog-wrapper.component';
import { ButtonComponent } from '../../button/button.component';
import { ButtonSeverity, ButtonSize } from '../../../enums/button.enum';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import {
  DropdownComponent,
  DropdownSize
} from '../../controllers/dropdown/dropdown.component';

@Component({
  selector: 'app-upsert-transaction-dialog',
  imports: [DialogWrapperComponent, ButtonComponent, DropdownComponent],
  templateUrl: './upsert-transaction-dialog.component.html',
  styleUrl: './upsert-transaction-dialog.component.scss'
})
export class UpsertTransactionDialogComponent extends BaseDialogComponent {
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonSeverity = ButtonSeverity;

  submitForm() {
    console.log(1);
    this.closeDialog();
  }

  protected readonly DropdownSize = DropdownSize;
}
