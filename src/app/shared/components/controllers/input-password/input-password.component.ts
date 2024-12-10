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
import { ButtonComponent } from '../../button/button.component';
import {
  ButtonSeverity,
  ButtonStyle,
  ButtonType
} from '../../../enums/button.enum';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, FormsModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent implements ControlValueAccessor {
  label: InputSignal<string> = input<string>('');
  placeholder: InputSignal<string> = input<string>('');

  value: WritableSignal<string> = signal<string>('');
  isVisible: WritableSignal<boolean> = signal<boolean>(false);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonType = ButtonType;

  toggleVisible(event: Event) {
    event.stopPropagation();
    this.isVisible.set(!this.isVisible());
  }

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
