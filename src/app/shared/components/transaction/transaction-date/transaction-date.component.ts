import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-date',
  imports: [DatePipe],
  templateUrl: './transaction-date.component.html',
  styleUrl: './transaction-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionDateComponent {
  date: InputSignal<Date | string> = input<Date | string>(new Date());
}
