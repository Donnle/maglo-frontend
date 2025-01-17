import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import {
  DatePickerOption,
  DatePickerWeekDays
} from '../../../interfaces/date-picker.interface';
import { DatePickerDayMonth } from '../../../enums/date-picker.enum';
import { chunkArray } from '../../../utils/chunk.util';
import { DATE_PICKER_WEEK_DAYS } from '../../../constants/date-picker.constant';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-date-picker',
  imports: [DatePipe, NgClass, DropdownComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent<T> implements OnInit, ControlValueAccessor {
  headerForm!: FormGroup;

  placeholder: InputSignal<string> = input<string>('Select Date');

  options: WritableSignal<DatePickerOption[][]> = signal([]);
  selectedDate: WritableSignal<Date | null> = signal<Date | null>(null);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly DATE_PICKER_WEEK_DAYS: DatePickerWeekDays[] =
    DATE_PICKER_WEEK_DAYS;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initOptions();
  }

  onDateClick(option: DatePickerOption): void {
    const { month, year } = this.headerForm.value;

    if (option.dayMonth === DatePickerDayMonth.Current) {
      const date = new Date(year, month, option.day);
      this.selectedDate.set(date);
    } else if (option.dayMonth === DatePickerDayMonth.Previous) {
      const previousMonth: number = month === 0 ? 11 : month - 1;
      const previousYear: number = month === 0 ? year - 1 : year;

      this.headerForm.patchValue({
        month: previousMonth,
        year: previousYear
      });

      const options: DatePickerOption[][] = this.getGroupedDates(
        previousMonth,
        previousYear
      );

      this.options.set(options);
    } else if (option.dayMonth === DatePickerDayMonth.Next) {
      const nextMonth: number = month === 11 ? 0 : month + 1;
      const nextYear: number = month === 11 ? year + 1 : year;

      this.headerForm.patchValue({
        month: nextMonth,
        year: nextYear
      });

      const options: DatePickerOption[][] = this.getGroupedDates(
        nextMonth,
        nextYear
      );

      this.options.set(options);
    }
  }

  private initOptions() {
    const currentDate = new Date();
    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    const options: DatePickerOption[][] = this.getGroupedDates(
      currentMonth,
      currentYear
    );

    this.options.set(options);
  }

  private getGroupedDates(month: number, year: number): DatePickerOption[][] {
    const dates: DatePickerOption[] = this.getDates(month, year);
    return chunkArray<DatePickerOption>(dates, 7);
  }

  private getDates(month: number, year: number): DatePickerOption[] {
    const previousMonthEnd = new Date(year, month, 0);
    const currentMonthStart: Date = new Date(year, month, 1);
    const currentMonthEnd: Date = new Date(year, month + 1, 0);

    const previousMonthLastDate: number = previousMonthEnd.getDate();
    const currentMonthLastDay: number = currentMonthEnd.getDay();
    const currentMonthFirstDay: number = currentMonthStart.getDay();
    const currentMonthLastDate: number = currentMonthEnd.getDate();

    const previousMonthDays: DatePickerOption[] =
      currentMonthFirstDay === 0
        ? []
        : this.getDaysOptions(
            previousMonthLastDate + 1 - currentMonthFirstDay,
            previousMonthLastDate + 1,
            DatePickerDayMonth.Previous
          );

    const currentMonthDays: DatePickerOption[] = this.getDaysOptions(
      1,
      currentMonthLastDate + 1,
      DatePickerDayMonth.Current
    );

    const nextMonthDays: DatePickerOption[] = this.getDaysOptions(
      1,
      7 - currentMonthLastDay,
      DatePickerDayMonth.Next
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  private getDaysOptions(
    from: number,
    to: number,
    dayMonth: DatePickerDayMonth = DatePickerDayMonth.Current
  ): DatePickerOption[] {
    const result: DatePickerOption[] = [];

    for (let day: number = from; day < to; day++) {
      result.push({ day, dayMonth });
    }

    return result;
  }

  private initForm(): void {
    const currentDate = new Date();
    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    this.headerForm = this.formBuilder.group({
      month: [currentMonth],
      year: [currentYear]
    });
  }

  // Value Accessor Functions
  private onChange = (value: T | unknown) => {};
  private onTouch = () => {};

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  writeValue(outsideValue: Date | null): void {
    this.selectedDate.set(outsideValue);
  }
}
