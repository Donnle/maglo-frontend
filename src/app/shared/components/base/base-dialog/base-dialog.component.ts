import { Directive, Inject, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder } from '@angular/forms';

@Directive()
export class BaseDialogComponent<T = unknown> {
  constructor(
    @Inject(DIALOG_DATA) @Optional() public dialogData: T,
    public dialogRef: DialogRef,
    public formBuilder: FormBuilder,
  ) {}

  closeDialog(data?: unknown) {
    this.dialogRef.close(data);
  }
}
