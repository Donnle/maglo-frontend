import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Currency } from '../../../../shared/enums/api/currency/currency.enum';
import { TransactionStatus } from '../../../../shared/enums/api/transaction/transaction.enum';
import { Transaction } from '../../../../shared/interfaces/api/transaction/transaction.interface';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsPageComponent {
  protected readonly transactions: Transaction[] = [
    {
      id: 1,
      date: '12-12-2024',
      status: TransactionStatus.Paid,
      countProducts: 2,
      product: {
        id: 2,
        name: 'Test',
        image: 'test',
        category: 'test',
        price: 0,
        currency: Currency.EUR
      }
    }
  ];
}
