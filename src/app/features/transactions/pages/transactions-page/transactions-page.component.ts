import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Currency } from '../../../../shared/enums/api/currency/currency.enum';
import { Transaction } from '../../../../shared/interfaces/api/transaction/transaction.interface';
import {
  ButtonSeverity,
  ButtonStyle
} from '../../../../shared/enums/button.enum';
import { TransactionStatus } from '../../../../shared/enums/api/transaction/transaction.enum';
import { Dialog } from '@angular/cdk/dialog';
import { ViewTransactionDialogComponent } from '../../dialogs/view-transaction-dialog/view-transaction-dialog.component';

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
      product: {
        id: 0,
        name: 'Iphone 13 Pro MAX',
        category: 'Apple. Inc',
        image:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-family',
        price: 420.84,
        currency: Currency.USD
      },
      date: new Date('2-2-2022'),
      status: TransactionStatus.Pending,
      countProducts: 2
    },
    {
      id: 2,
      product: {
        id: 1,
        name: 'Netflix Subscription',
        category: 'Netflix',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        price: 100.0,
        currency: Currency.USD
      },
      date: new Date('2-2-2023'),
      status: TransactionStatus.Paid,
      countProducts: 1
    },
    {
      id: 3,
      product: {
        id: 2,
        name: 'Figma Subscription',
        category: 'Figma. Inc',
        image: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
        price: 244.2,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Paid,
      countProducts: 1
    },
    {
      id: 4,
      product: {
        id: 3,
        name: 'Bitcoin Transaction',
        category: 'Coinbase',
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        price: -520.84,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Paid,
      countProducts: 1
    },
    {
      id: 5,
      product: {
        id: 4,
        name: 'Sajib Rahman',
        category: 'Appsumo',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        price: 500.1,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Paid,
      countProducts: 1
    },
    {
      id: 6,
      product: {
        id: 5,
        name: 'Instagram Ads',
        category: 'Meta',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
        price: 100.0,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Unpaid,
      countProducts: 1
    },
    {
      id: 7,
      product: {
        id: 6,
        name: 'UIHUT Subscription',
        category: 'UIHUT',
        image: 'https://cdn.uihut.com/images/logo/logo.svg',
        price: -84.0,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Pending,
      countProducts: 1
    },
    {
      id: 8,
      product: {
        id: 7,
        name: 'Citi Bank Ltd.',
        category: 'City Bank',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Citi.svg',
        price: 400.11,
        currency: Currency.USD
      },
      date: new Date(),
      status: TransactionStatus.Unpaid,
      countProducts: 1
    }
  ];
  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSeverity = ButtonSeverity;

  constructor(private dialog: Dialog) {}

  onViewTransactionClick(transactionId: number) {
    console.log(transactionId);
    this.dialog.open(ViewTransactionDialogComponent, {
      width: '500px',
      data: { title: 'Transaction Details' }
    });
  }
}
