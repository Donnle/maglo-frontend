import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-date',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transaction-date.component.html',
  styleUrl: './transaction-date.component.scss'
})
export class TransactionDateComponent {
  @Input() date: Date | string = new Date();
}
