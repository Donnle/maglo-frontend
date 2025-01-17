import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import {
  InvoicesItem,
  InvoicesItemGroup
} from '../../interfaces/invoices-items.interface';

@Component({
  selector: 'app-invoices-items',
  standalone: false,
  templateUrl: './invoices-items.component.html',
  styleUrl: './invoices-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InvoicesItemsComponent),
      multi: true
    }
  ]
})
export class InvoicesItemsComponent implements ControlValueAccessor, OnInit {
  protected formArray!: FormArray<FormGroup<InvoicesItemGroup>>;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formArray = this.formBuilder.array<FormGroup<InvoicesItemGroup>>([]);
  }

  ngOnInit() {
    this.formArray.valueChanges.subscribe({
      next: (value) => {
        this.onChange(value);
      }
    });
  }

  addItem(item?: InvoicesItem) {
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

    this.formArray.push(invoiceItem);
    this.changeDetectorRef.detectChanges();
  }

  removeItem(itemIndex: number) {
    this.formArray.removeAt(itemIndex);
    this.changeDetectorRef.detectChanges();
  }

  // Value Accessor Functions
  private onChange = (value: unknown) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(invoiceItems: InvoicesItem[]): void {
    // this.formArray = this.formBuilder.array(
    //   invoiceItems.map((x) => this.addItem())
    // );
    // this.formArray.valueChanges.subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.onChange(res);
    //   }
    // });
  }
}
