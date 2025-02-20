import { DatePickerDayMonth } from '../enums/date-picker.enum';

export interface DatePickerOption {
  day: number;
  dayMonth: DatePickerDayMonth;
}

export interface DatePickerWeekDays {
  label: string;
  value: string;
}
