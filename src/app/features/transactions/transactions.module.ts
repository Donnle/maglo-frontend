import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { TransactionProductComponent } from '../../shared/components/transaction/transaction-product/transaction-product.component';
import { TransactionDateComponent } from '../../shared/components/transaction/transaction-date/transaction-date.component';
import { InputComponent } from '../../shared/components/controllers/input/input.component';

@NgModule({
  declarations: [TransactionsPageComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    TransactionProductComponent,
    TransactionDateComponent,
    InputComponent
  ]
})
export class TransactionsModule {}
