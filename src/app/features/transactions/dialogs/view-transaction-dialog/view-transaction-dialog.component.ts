import { Component } from '@angular/core';
import { DialogWrapperComponent } from '../../../../shared/components/wrappers/dialog-wrapper/dialog-wrapper.component';
import { TransactionProductComponent } from '../../../../shared/components/transaction/transaction-product/transaction-product.component';
import { CurrencyPipe } from '@angular/common';
import {
  TransactionPaymentMethod,
  TransactionPaymentMethodComponent
} from '../../components/transaction-payment-method/transaction-payment-method.component';
import { CreditCardType } from '../../../../shared/enums/credit-card.enum';

@Component({
  selector: 'app-view-transaction-dialog',
  imports: [
    DialogWrapperComponent,
    TransactionProductComponent,
    CurrencyPipe,
    TransactionPaymentMethodComponent
  ],
  templateUrl: './view-transaction-dialog.component.html',
  styleUrl: './view-transaction-dialog.component.scss'
})
export class ViewTransactionDialogComponent {
  protected readonly TransactionPaymentMethod = TransactionPaymentMethod;
  protected readonly CreditCardType = CreditCardType;
}
