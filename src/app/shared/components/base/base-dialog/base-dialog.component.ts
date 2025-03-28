import { Directive, Inject, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Directive()
export class BaseDialogComponent<T = unknown> {
  constructor(
    @Inject(DIALOG_DATA) @Optional() private dialogData: T,
    private dialogRef: DialogRef
  ) {}

  closeDialog(data?: unknown) {
    this.dialogRef.close(data);
  }
}
