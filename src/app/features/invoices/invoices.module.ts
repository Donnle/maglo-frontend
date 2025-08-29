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
import { InvoicesSenderCardComponent } from './components/invoices-sender-card/invoices-sender-card.component';
import { InvoicesGeneralCardComponent } from './components/invoices-general-card/invoices-general-card.component';
import { InvoicesBasicInfoCardComponent } from './components/invoices-basic-info-card/invoices-basic-info-card.component';
import { DatePickerComponent } from '../../shared/components/controllers/date-picker/date-picker.component';
import { CreateInvoiceService } from './services/create-invoice.service';

@NgModule({
  declarations: [
    InvoicesPageComponent,
    InvoicesCreatePageComponent,
    InvoicesClientCardComponent,
    InvoicesSenderCardComponent,
    InvoicesGeneralCardComponent,
    InvoicesBasicInfoCardComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    DatePickerComponent
  ],
  providers: [CreateInvoiceService]
})
export class InvoicesModule {}
