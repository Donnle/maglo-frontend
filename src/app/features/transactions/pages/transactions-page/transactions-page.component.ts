import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InputComponent } from '../../../../shared/components/controllers/input/input.component';
import { TransactionProductComponent } from '../../../../shared/components/transaction/transaction-product/transaction-product.component';
import { TransactionDateComponent } from '../../../../shared/components/transaction/transaction-date/transaction-date.component';
import { Currency } from '../../../../shared/enums/api/currency/currency.enum';
import { TransactionStatus } from '../../../../shared/enums/api/transaction/transaction.enum';
import { Transaction } from '../../../../shared/interfaces/api/transaction/transaction.interface';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    InputComponent,
    TransactionProductComponent,
    TransactionDateComponent,
    CurrencyPipe
  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent {
  transactions: Transaction[] = [
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
