import { Component } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonStyle
} from '../../../../shared/enums/button.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoices-basic-info-card',
  standalone: false,
  templateUrl: './invoices-basic-info-card.component.html',
  styleUrl: './invoices-basic-info-card.component.scss'
})
export class InvoicesBasicInfoCardComponent {
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSeverity = ButtonSeverity;

  protected basicInvoiceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.basicInvoiceForm = this.formBuilder.group({
      invoice_date: this.formBuilder.control(null, []),
      due_date: this.formBuilder.control(null, [])
    });
  }

  onPreviewClick() {
    console.log('preview');
  }

  onDownloadClick() {
    console.log('download');
  }

  onFormSubmit() {
    console.log('submit');
  }
}
