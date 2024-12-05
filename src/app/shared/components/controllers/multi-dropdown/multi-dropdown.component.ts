import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { PrimitiveTypes } from '@angular/cli/src/analytics/analytics-parameters';
import { DropdownItem } from '../../../interfaces/dropdown.interface';

@Component({
  selector: 'app-multi-dropdown',
  standalone: true,
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './multi-dropdown.component.html',
  styleUrl: './multi-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiDropdownComponent<T extends DropdownItem>
  implements ControlValueAccessor
{
  @Input({ required: true }) options: T[] = [];
  @Input() optionValueName?: string = 'id'; // Empty if Need Object As Value
  @Input() optionLabelName: string = 'label';
  @Input() loading: boolean = false;

  @Input() empty: string = 'No Options';
  @Input() placeholder: string = 'Select';

  @Input() countVisibleSelectedOptions: number = 2;
  selectedOptionIndexes: number[] = [];

  protected isOpen: boolean = false;
  protected isDisabled: boolean = false;

  get selectedOptionLabels() {
    return this.selectedOptionIndexes.map(
      (selectedOptionIndex) =>
        this.options[selectedOptionIndex][this.optionLabelName]
    );
  }

  toggleSelect(optionIndex: number, optionValue: boolean): void {
    if (optionValue) {
      this.selectedOptionIndexes = [...this.selectedOptionIndexes, optionIndex];
    } else {
      this.selectedOptionIndexes = this.selectedOptionIndexes.filter(
        (selectedOptionIndex: number): boolean => {
          return selectedOptionIndex !== optionIndex;
        }
      );
    }

    const selectedOptions: unknown[] = this.selectedOptionIndexes.map(
      (selectedOptionIndex: number): unknown => {
        if (this.optionValueName) {
          return this.options[selectedOptionIndex][this.optionValueName];
        }

        return this.options[selectedOptionIndex];
      }
    );

    this.onChange(selectedOptions);
    this.onTouched();

    // if (this.optionValueName == null) {
    //   this.onChange(this.options[optionIndex]);
    // } else {
    //   this.onChange(this.options[optionIndex][this.optionValueName]);
    // }
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

  writeValue(outsideValue: (T | PrimitiveTypes)[]): void {
    this.selectedOptionIndexes =
      this.getOptionIndexesByOutsideValue(outsideValue);
  }

  private getOptionIndexesByOutsideValue(
    outsideValues: (T | PrimitiveTypes)[]
  ): number[] {
    if (outsideValues[0] != null) {
      return [];
    }

    const result: number[] = [];

    if (typeof outsideValues[0] == 'object') {
      // @ts-ignore-next-line | Value Type is Object
      outsideValues.forEach((outsideValue: T) => {
        const stringifiedOutsideValue: string = JSON.stringify(outsideValue);
        const selectedIndex: number = this.options.findIndex(
          (option: T): boolean => {
            return JSON.stringify(option) === stringifiedOutsideValue;
          }
        );

        result.push(selectedIndex);
      });
    } else {
      const optionValueName: string | undefined = this.optionValueName;
      if (optionValueName == null) {
        return [];
      }

      // @ts-ignore-next-line | Value Type is PrimitiveTypes
      outsideValues.forEach((outsideValue: PrimitiveTypes) => {
        const selectedIndex: number = this.options.findIndex(
          (option: T): boolean => option[optionValueName] === outsideValue
        );

        result.push(selectedIndex);
      });
    }

    return result;
  }
}
