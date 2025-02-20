import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesCreatePageComponent } from './pages/invoices-create-page/invoices-create-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/controllers/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LinkComponent } from '../../shared/components/link/link.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { InvoicesClientCardComponent } from './components/invoices-client-card/invoices-client-card.component';
import { QueryControlDirective } from '../../shared/directives/query-control.directive';
import { TransactionProductComponent } from '../../shared/components/transaction/transaction-product/transaction-product.component';
import { TransactionDateComponent } from '../../shared/components/transaction/transaction-date/transaction-date.component';
import { TagComponent } from '../../shared/components/tag/tag.component';

@NgModule({
  declarations: [
    InvoicesPageComponent,
    InvoicesCreatePageComponent,
    InvoicesClientCardComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    QueryControlDirective,
    TransactionProductComponent,
    TransactionDateComponent,
    TagComponent
  ]
})
export class InvoicesModule {}
