import { Component, Input } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { BaseControl } from '../base/base-control.component';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent extends BaseControl {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
}
