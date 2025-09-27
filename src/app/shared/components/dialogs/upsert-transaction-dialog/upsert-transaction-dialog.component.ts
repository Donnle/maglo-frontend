import { Component, OnInit } from '@angular/core';
import { DialogWrapperComponent } from '../../wrappers/dialog-wrapper/dialog-wrapper.component';
import { ButtonComponent } from '../../button/button.component';
import { ButtonSeverity, ButtonSize } from '../../../enums/button.enum';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import {
  DropdownComponent,
  DropdownSize
} from '../../controllers/dropdown/dropdown.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../controllers/input/input.component';

@Component({
  selector: 'app-upsert-transaction-dialog',
  imports: [
    DialogWrapperComponent,
    ButtonComponent,
    DropdownComponent,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './upsert-transaction-dialog.component.html',
  styleUrl: './upsert-transaction-dialog.component.scss'
})
export class UpsertTransactionDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly DropdownSize = DropdownSize;
  protected readonly currentDate = new Date();

  upsertTransactionForm!: FormGroup;

  ngOnInit() {
    this.initUpsertTransactionForm();
  }

  submitForm() {
    this.closeDialog();
  }

  private initUpsertTransactionForm(): void {
    this.upsertTransactionForm = this.formBuilder.group({
      amount: [0, Validators.required],
      category: ['', Validators.required],
      date: [this.currentDate, Validators.required],
      description: '',
      time: null,
      location: null,
      photo: null
    });
  }
}
