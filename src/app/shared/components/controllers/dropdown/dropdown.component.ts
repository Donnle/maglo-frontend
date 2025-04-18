import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DropdownItem } from '../../../interfaces/dropdown.interface';

export enum DropdownSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Wide = 'wide'
}

export enum DropdownStyle {
  Primary = 'primary',
  Secondary = 'secondary'
}

@Component({
  selector: 'app-dropdown',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent<T extends DropdownItem>
  implements ControlValueAccessor
{
  options: InputSignal<T[]> = input.required<T[]>();
  optionValueName: InputSignal<string | null> = input<string | null>('id'); // Empty if Need Object As Value
  optionLabelName: InputSignal<string> = input('label');
  loading: InputSignal<boolean> = input(false);

  empty: InputSignal<string> = input('No Options');
  placeholder: InputSignal<string> = input('Select');

  // Styles
  size: InputSignal<DropdownSize> = input<DropdownSize>(DropdownSize.Small);
  style: InputSignal<DropdownStyle> = input<DropdownStyle>(
    DropdownStyle.Primary
  );

  selectedOptionIndex: WritableSignal<number> = signal<number>(-1);
  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  onSelectOption(optionIndex: number): void {
    this.selectedOptionIndex.set(optionIndex);
    this.isOpen.set(false);

    if (this.optionValueName() == null) {
      this.onChange(this.options()[optionIndex]);
    } else {
      this.onChange(this.options()[optionIndex][this.optionValueName()!]);
    }

    this.onTouched();
  }

  // DropDown Open/Close
  toggleDropdownOpen(): void {
    this.isOpen.update((isOpen: boolean): boolean => !isOpen);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  // Value Accessor Functions
  private onChange = (value: T | unknown) => {};
  private onTouched = () => {};

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  registerOnChange(fn: (value: T | unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: T | string): void {
    this.selectedOptionIndex.set(
      this.getOptionIndexByOutsideValue(outsideValue)
    );
  }

  private getOptionIndexByOutsideValue(
    outsideValue: T | string,
    options: T[] = this.options()
  ): number {
    if (outsideValue == null) {
      return -1;
    }

    if (typeof outsideValue == 'object') {
      const stringifiedOutsideValue: string = JSON.stringify(outsideValue);

      return options.findIndex((option: T): boolean => {
        return JSON.stringify(option) === stringifiedOutsideValue;
      });
    } else {
      const optionValueName: string | null = this.optionValueName();
      if (optionValueName == null) {
        return -1;
      }

      return options.findIndex((option: T): boolean => {
        return option[optionValueName] === outsideValue;
      });
    }
  }
}
