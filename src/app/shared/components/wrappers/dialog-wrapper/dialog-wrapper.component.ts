import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ButtonComponent } from '../../button/button.component';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonStyle
} from '../../../enums/button.enum';

@Component({
  selector: 'app-dialog-wrapper',
  imports: [ButtonComponent],
  templateUrl: './dialog-wrapper.component.html',
  styleUrl: './dialog-wrapper.component.scss'
})
export class DialogWrapperComponent {
  protected readonly title = inject(DIALOG_DATA)?.title;

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSeverity = ButtonSeverity;

  constructor(private dialogRef: DialogRef) {}

  onClose() {
    this.dialogRef.close();
  }
}
