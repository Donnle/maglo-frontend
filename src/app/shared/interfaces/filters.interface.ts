export interface Filter {
  controlName: string;
  type: FilterType;

  query?: string;

  options?: unknown[];
  optionLabelName?: string | null;
  optionValueName?: string | null;
}

export enum FilterType {
  Dropdown = 'dropdown'
}
