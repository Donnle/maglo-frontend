import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiDropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiDropdownComponent<T extends DropdownItem>
  implements ControlValueAccessor
{
  options: InputSignal<T[]> = input.required<T[]>();
  optionValueName: InputSignal<string | null> = input<string | null>('id'); // Empty if Need Object As Value
  optionLabelName: InputSignal<string> = input('label');
  loading: InputSignal<boolean> = input(false);

  empty: InputSignal<string> = input<string>('No Options');
  placeholder: InputSignal<string> = input<string>('Select');
  countVisibleSelectedOptions: InputSignal<number> = input<number>(2);

  selectedOptionIndexes: WritableSignal<number[]> = signal<number[]>([]);

  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  get selectedOptionLabels(): unknown[] {
    return this.selectedOptionIndexes().map(
      (selectedOptionIndex: number): unknown =>
        this.options()[selectedOptionIndex][this.optionLabelName()]
    );
  }

  toggleSelect(optionIndex: number, optionValue: boolean): void {
    if (optionValue) {
      this.selectedOptionIndexes.update(
        (selectedOptionIndexes: number[]): number[] => {
          return [...selectedOptionIndexes, optionIndex];
        }
      );
    } else {
      this.selectedOptionIndexes.update(
        (selectedOptionIndexes: number[]): number[] => {
          return selectedOptionIndexes.filter(
            (selectedOptionIndex: number): boolean => {
              return selectedOptionIndex !== optionIndex;
            }
          );
        }
      );
    }

    const selectedOptions: unknown[] = this.selectedOptionIndexes().map(
      (selectedOptionIndex: number): unknown => {
        const optionValueName: string | null = this.optionValueName();
        if (optionValueName) {
          return this.options()[selectedOptionIndex][optionValueName];
        }

        return this.options()[selectedOptionIndex];
      }
    );

    this.onChange(selectedOptions);
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

  writeValue(outsideValue: (T | PrimitiveTypes)[]): void {
    const indexes: number[] = this.getOptionIndexesByOutsideValue(outsideValue);
    this.selectedOptionIndexes.set(indexes);
  }

  private getOptionIndexesByOutsideValue(
    outsideValues: (T | PrimitiveTypes)[],
    options: T[] = this.options()
  ): number[] {
    if (outsideValues[0] == null) {
      return [];
    }

    const result: number[] = [];

    if (typeof outsideValues[0] == 'object') {
      // @ts-ignore-next-line | Value Type is Object
      outsideValues.forEach((outsideValue: T) => {
        const stringifiedOutsideValue: string = JSON.stringify(outsideValue);
        const selectedIndex: number = options.findIndex(
          (option: T): boolean => {
            return JSON.stringify(option) === stringifiedOutsideValue;
          }
        );

        result.push(selectedIndex);
      });
    } else {
      const optionValueName: string | null = this.optionValueName();
      if (optionValueName == null) {
        return [];
      }

      // @ts-ignore-next-line | Value Type is PrimitiveTypes
      outsideValues.forEach((outsideValue: PrimitiveTypes) => {
        const selectedIndex: number = options.findIndex(
          (option: T): boolean => option[optionValueName] === outsideValue
        );

        result.push(selectedIndex);
      });
    }

    return result;
  }
}
