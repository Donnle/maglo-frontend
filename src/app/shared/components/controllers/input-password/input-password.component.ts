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
import {
  ButtonComponent,
  ButtonSeverity,
  ButtonStyle,
  ButtonType
} from '../../button/button.component';

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
  @Input() label: string = '';
  @Input() placeholder: string = '';

  value: string = '';
  isVisible: boolean = false;

  protected isDisabled: boolean = false;

  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonType = ButtonType;

  toggleVisible(event: Event) {
    event.stopPropagation();
    this.isVisible = !this.isVisible;
  }

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
