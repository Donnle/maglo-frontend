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
    LinkComponent
  ]
})
export class InvoicesModule {}
