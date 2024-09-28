import { Component, Input } from '@angular/core';
import { BaseControl } from './base-control.component';

@Component({
  standalone: true,
  template: ''
})
export class BaseInput extends BaseControl {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
}
