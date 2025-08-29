import { Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CreditCardType } from '../../../../shared/enums/credit-card.enum';

export enum TransactionPaymentMethod {
  Cash,
  Card
}

@Component({
  selector: 'app-transaction-payment-method',
  imports: [NgClass],
  templateUrl: './transaction-payment-method.component.html',
  styleUrl: './transaction-payment-method.component.scss'
})
export class TransactionPaymentMethodComponent {
  protected readonly TransactionPaymentMethod = TransactionPaymentMethod;
  protected readonly CreditCardType = CreditCardType;

  paymentMethod: InputSignal<TransactionPaymentMethod> =
    input<TransactionPaymentMethod>(TransactionPaymentMethod.Cash);

  cardName: InputSignal<string> = input<string>('');
  cardNumber: InputSignal<string> = input<string>('');
  cardType: InputSignal<CreditCardType | undefined> = input<CreditCardType>();
}
