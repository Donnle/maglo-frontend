import { Component } from '@angular/core';
import { ButtonSeverity } from '../../../../shared/enums/button.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoices-create-page',
  standalone: false,
  templateUrl: './invoices-create-page.component.html',
  styleUrl: './invoices-create-page.component.scss'
})
export class InvoicesCreatePageComponent {
  protected readonly invoiceForm: FormGroup;

  protected readonly ButtonSeverity = ButtonSeverity;

  constructor(private formBuilder: FormBuilder) {
    this.invoiceForm = this.formBuilder.group({
      customerId: this.formBuilder.control(null, [Validators.required]),
      invoiceDate: this.formBuilder.control(null, [Validators.required]),
      dueDate: this.formBuilder.control(null, [Validators.required]),

      discount: this.formBuilder.control(null, [Validators.required]),
      subtotal: this.formBuilder.control(null, [Validators.required]),
      tax: this.formBuilder.control(null, [Validators.required]),

      items: this.formBuilder.control([])
    });
  }
}
