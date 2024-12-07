import { TimeRange } from '../enums/time-range.enum';
import { Option } from '../interfaces/option.interface';

export const TIME_RANGE: Option[] = [
  {
    id: TimeRange.LastDay,
    label: 'Last Day'
  },
  {
    id: TimeRange.LastWeek,
    label: 'Last Week'
  },
  {
    id: TimeRange.LastMonth,
    label: 'Last Month'
  },
  {
    id: TimeRange.LastYear,
    label: 'Last Year'
  }
];
