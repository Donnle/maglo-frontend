import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputIconPosition } from '../../../enums/input.enum';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule],
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
  iconPosition: InputSignal<InputIconPosition> = input<InputIconPosition>(
    InputIconPosition.Left
  );

  icon: InputSignal<string | undefined> = input<string>();
  label: InputSignal<string> = input<string>('');
  placeholder: InputSignal<string> = input<string>('');

  value: WritableSignal<string> = signal<string>('');
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  onValueChange(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
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
    this.isDisabled.set(isDisabled);
  }

  writeValue(value: string): void {
    this.value.set(value);
  }
}
