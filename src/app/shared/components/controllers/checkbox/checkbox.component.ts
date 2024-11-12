import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
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
  @Input() trueValue: unknown = true;
  @Input() falseValue: unknown = false;

  @Input() label: string = '';

  isChecked: boolean = false;

  protected isDisabled: boolean = false;

  onCheckboxClick(isChecked: boolean) {
    this.isChecked = isChecked;

    if (this.isChecked) {
      this.onChange(this.trueValue);
    } else {
      this.onChange(this.falseValue);
    }

    this.onTouch();
  }

  // Value Accessor Functions
  private onChange!: (value: unknown) => void;
  private onTouch!: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(outsideValue: unknown): void {
    this.isChecked =
      JSON.stringify(outsideValue) === JSON.stringify(this.trueValue);
  }
}
