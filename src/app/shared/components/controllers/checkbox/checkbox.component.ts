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
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  trueValue: InputSignal<unknown> = input<unknown>(true);
  falseValue: InputSignal<unknown> = input<unknown>(false);
  label: InputSignal<string> = input<string>('');

  isChecked: WritableSignal<boolean> = signal<boolean>(false);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  onCheckboxClick(isChecked: boolean): void {
    this.isChecked.set(isChecked);

    if (this.isChecked()) {
      this.onChange(this.trueValue());
    } else {
      this.onChange(this.falseValue());
    }

    this.onTouch();
  }

  // Value Accessor Functions
  private onChange!: (value: unknown) => void;
  private onTouch!: () => void;

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  writeValue(outsideValue: unknown): void {
    const isChecked: boolean =
      JSON.stringify(outsideValue) === JSON.stringify(this.trueValue());

    this.isChecked.set(isChecked);
  }
}
