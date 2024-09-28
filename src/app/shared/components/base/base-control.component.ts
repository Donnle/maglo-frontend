import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  template: ''
})
export class BaseControl {
  @Input({ required: true }) control!: FormControl | any;
}
