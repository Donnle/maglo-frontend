import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';

type DropdownItem = Record<string, unknown>;

@Component({
  selector: 'app-dropdown',
  standalone: true,
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
  @Input({ required: true }) options: T[] = [];
  @Input() optionValueName?: string = 'id'; // Empty if Need Object As Value
  @Input() optionLabelName: string = 'label';
  @Input() loading: boolean = false;

  @Input() empty: string = 'No Options';
  @Input() placeholder: string = 'Select';

  selectedOptionIndex: number = -1;

  protected isOpen: boolean = false;
  protected isDisabled: boolean = false;

  onSelectOption(optionIndex: number): void {
    this.selectedOptionIndex = optionIndex;
    this.isOpen = false;

    if (this.optionValueName == null) {
      this.onChange(this.options[optionIndex]);
    } else {
      this.onChange(this.options[optionIndex][this.optionValueName]);
    }

    this.onTouched();
  }

  // DropDown Open/Close
  toggleDropdownOpen(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  // Value Accessor Functions
  private onChange = (value: T | unknown) => {};
  private onTouched = () => {};

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn: (value: T | unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: T | string): void {
    this.selectedOptionIndex = this.getOptionIndexByOutsideValue(outsideValue);
  }

  private getOptionIndexByOutsideValue(outsideValue: T | string): number {
    if (typeof outsideValue == 'object') {
      const stringifiedOutsideValue: string = JSON.stringify(outsideValue);

      return this.options.findIndex((option: T): boolean => {
        return JSON.stringify(option) === stringifiedOutsideValue;
      });
    } else {
      const optionValueName: string | undefined = this.optionValueName;
      if (optionValueName == null) {
        return -1;
      }

      return this.options.findIndex((option: T): boolean => {
        return option[optionValueName] === outsideValue;
      });
    }
  }
}
