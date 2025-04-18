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
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { DatePickerOption } from '../../../interfaces/date-picker.interface';
import { DatePickerDayMonth } from '../../../enums/date-picker.enum';
import { chunkArray } from '../../../utils/chunk.util';
import { MONTHS, WEEK_DAYS } from '../../../constants/date-picker.constant';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-date-picker',
  imports: [
    DatePipe,
    NgClass,
    ReactiveFormsModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  protected readonly currentDate: Date = new Date();
  protected readonly MONTHS: string[] = MONTHS;
  protected readonly WEEK_DAYS: string[] = WEEK_DAYS;

  label: InputSignal<string> = input<string>('Query Test');
  placeholder: InputSignal<string> = input<string>('Select Date');

  minDate: InputSignal<Date> = input<Date>(new Date(0));
  maxDate: InputSignal<Date> = input<Date>(new Date(Infinity));
  isWeekendDisabled: InputSignal<boolean> = input<boolean>(false);

  // State
  year: WritableSignal<number> = signal<number>(this.currentDate.getFullYear());
  month: WritableSignal<number> = signal<number>(this.currentDate.getMonth());
  options: WritableSignal<DatePickerOption[][]> = signal([]);
  selectedDate: WritableSignal<Date | null> = signal<Date | null>(null);
  isCalendarOpen: WritableSignal<boolean> = signal<boolean>(false);
  isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.updateOptions();
  }

  onDateClick(option: DatePickerOption): void {
    if (option.dayMonth === DatePickerDayMonth.Current) {
      this.selectedDate.set(option.date);
      this.onChange(option.date);
      this.closeCalendar();
    } else if (option.dayMonth === DatePickerDayMonth.Previous) {
      this.onPrevClick();
    } else if (option.dayMonth === DatePickerDayMonth.Next) {
      this.onNextClick();
    }

    this.onTouch();
  }

  onPrevClick() {
    this.month.update((month: number) => (month === 0 ? 11 : month - 1));
    this.year.update((year: number) => (this.month() === 11 ? year - 1 : year));
    this.updateOptions();
  }

  onNextClick() {
    this.month.update((month: number) => (month === 11 ? 0 : month + 1));
    this.year.update((year: number) => (this.month() === 0 ? year + 1 : year));
    this.updateOptions();
  }

  toggleOpen() {
    this.isCalendarOpen.update((isCalendarOpen: boolean) => !isCalendarOpen);
  }

  closeCalendar() {
    this.isCalendarOpen.set(false);
  }

  private updateOptions() {
    const options: DatePickerOption[][] = this.getGroupedDates(
      this.month(),
      this.year()
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

    const prevMonth: number = this.month() === 0 ? 11 : month - 1;
    const prevYear: number = prevMonth === 11 ? this.year() - 1 : this.year();
    const previousMonthDays: DatePickerOption[] =
      currentMonthFirstDay === 0
        ? []
        : this.getDaysOptions(
            previousMonthLastDate + 1 - currentMonthFirstDay,
            previousMonthLastDate + 1,
            prevMonth,
            prevYear,
            DatePickerDayMonth.Previous
          );

    const currentMonthDays: DatePickerOption[] = this.getDaysOptions(
      1,
      currentMonthLastDate + 1,
      this.month(),
      this.year(),
      DatePickerDayMonth.Current
    );

    const nextMonth: number = this.month() === 11 ? 0 : month + 1;
    const nextYear: number = nextMonth === 0 ? this.year() + 1 : this.year();
    const nextMonthDays: DatePickerOption[] = this.getDaysOptions(
      1,
      7 - currentMonthLastDay,
      nextMonth,
      nextYear,
      DatePickerDayMonth.Next
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  private getDaysOptions(
    from: number,
    to: number,
    month: number,
    year: number,
    dayMonth: DatePickerDayMonth = DatePickerDayMonth.Current
  ): DatePickerOption[] {
    const result: DatePickerOption[] = [];

    for (let day: number = from; day < to; day++) {
      result.push({ date: new Date(year, month, day), dayMonth });
    }

    return result;
  }

  // Value Accessor Functions
  private onChange = (value: Date | unknown) => {};
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
