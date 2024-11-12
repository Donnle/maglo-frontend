import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';

export enum InputIconPosition {
  Left = 'left',
  Right = 'right'
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule, ButtonComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  @Input() icon?: string;
  @Input() iconPosition: InputIconPosition = InputIconPosition.Left;

  @Input() label: string = '';
  @Input() placeholder: string = '';

  value: string = '';

  protected isDisabled: boolean = false;

  onValueChange(value: string) {
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }

  // Value Accessor Functions
  private onChange = (value: string) => {};
  private onTouched = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
