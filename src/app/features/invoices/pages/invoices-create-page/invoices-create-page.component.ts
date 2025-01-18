import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { ButtonSeverity } from '../../../../shared/enums/button.enum';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  InvoicesItem,
  InvoicesItemGroup
} from '../../interfaces/invoices-items.interface';

@Component({
  selector: 'app-invoices-create-page',
  standalone: false,
  templateUrl: './invoices-create-page.component.html',
  styleUrl: './invoices-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesCreatePageComponent {
  protected readonly invoiceForm: FormGroup;

  protected readonly ButtonSeverity = ButtonSeverity;

  protected get invoiceItems(): FormArray<FormGroup<InvoicesItemGroup>> {
    return this.invoiceForm.get('items') as FormArray<FormGroup>;
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.invoiceForm = this.formBuilder.group({
      customerId: this.formBuilder.control(null, [Validators.required]),
      invoiceDate: this.formBuilder.control(null, [Validators.required]),
      dueDate: this.formBuilder.control(null, [Validators.required]),

      discount: this.formBuilder.control(null, [Validators.required]),
      subtotal: this.formBuilder.control(null, [Validators.required]),
      tax: this.formBuilder.control(null, [Validators.required]),

      items: this.formBuilder.array<InvoicesItemGroup>([])
    });
  }

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
      total: this.formBuilder.control(item?.total || 0, [Validators.required])
    });

    this.invoiceItems.push(invoiceItem);
    this.changeDetectorRef.detectChanges();
  }

  removeInvoiceItem(itemIndex: number) {
    this.invoiceItems.removeAt(itemIndex);
    this.changeDetectorRef.detectChanges();
  }
}
