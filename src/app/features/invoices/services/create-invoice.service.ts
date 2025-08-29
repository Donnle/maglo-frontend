import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { InvoicesModule } from '../invoices.module';
import {
  InvoicesItem,
  InvoicesItemGroup
} from '../interfaces/invoices-items.interface';

interface CreateInvoiceForm {
  clientId: FormControl<number | null>;
  invoiceDate: FormControl<Date | null>;
  dueDate: FormControl<Date | null>;

  items: FormArray<FormGroup<InvoicesItemGroup>>;

  // Additional Options
  tax?: FormControl<number | null>;
  discount?: FormControl<number | null>;
}

@Injectable({ providedIn: InvoicesModule })
export class CreateInvoiceService {
  createInvoiceForm: FormGroup<CreateInvoiceForm>;

  // TODO: Add Client info
  client: WritableSignal<any> = signal<any>({});
  subtotal: WritableSignal<number> = signal<number>(0);

  get invoiceItems(): FormArray<FormGroup<InvoicesItemGroup>> {
    return this.createInvoiceForm.controls['items'];
  }

  constructor(private formBuilder: FormBuilder) {
    this.createInvoiceForm = this.formBuilder.group<CreateInvoiceForm>({
      clientId: this.formBuilder.control(null, []),
      invoiceDate: this.formBuilder.control(null, []),
      dueDate: this.formBuilder.control(null, []),

      items: this.formBuilder.array<FormGroup<InvoicesItemGroup>>([])
    });
  }

  // Invoice Items
  addInvoiceItem(item?: InvoicesItem) {
    const invoiceItem = this.formBuilder.group<InvoicesItemGroup>({
      name: this.formBuilder.control(item?.name || '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      quantity: this.formBuilder.control(item?.quantity || 0, [
        Validators.required,
        Validators.min(1)
      ]),
      rate: this.formBuilder.control(item?.rate || 0, [Validators.required]),
      total: this.formBuilder.control(
        { value: item?.total || 0, disabled: true },
        [Validators.required]
      )
    });

    this.invoiceItems.push(invoiceItem);
  }

  removeInvoiceItem(itemIndex: number) {
    this.invoiceItems.removeAt(itemIndex);
  }

  // Tax
  addTaxControl() {
    const control: FormControl = this.formBuilder.control(0);
    this.createInvoiceForm.addControl('tax', control);
  }

  removeTaxControl() {
    this.createInvoiceForm.removeControl('tax');
  }

  // Discount
  addDiscountControl() {
    const control: FormControl = this.formBuilder.control(0);
    this.createInvoiceForm.addControl('discount', control);
  }

  removeDiscountControl() {
    this.createInvoiceForm.removeControl('discount');
  }
}
