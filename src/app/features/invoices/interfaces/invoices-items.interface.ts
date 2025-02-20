import { AbstractControl } from '@angular/forms';

export interface InvoicesItem {
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface InvoicesItemGroup {
  name: AbstractControl<string | null, null>;
  quantity: AbstractControl<number | null, null>;
  rate: AbstractControl<number | null, null>;
  total: AbstractControl<number | null, null>;
}
