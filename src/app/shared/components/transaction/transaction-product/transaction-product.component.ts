import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-product',
  standalone: true,
  imports: [],
  templateUrl: './transaction-product.component.html',
  styleUrl: './transaction-product.component.scss'
})
export class TransactionProductComponent {
  @Input() name: string = 'Iphone 13 Pro MAX';
  @Input() category: string = 'Apple. Inc';
  @Input() set imageSrc(imageSrc: string | undefined) {
    if (imageSrc) {
      this._imageSrc = imageSrc;
    } else {
      this._imageSrc = this.DEFAULT_PRODUCT_IMAGE;
    }
  }

  _imageSrc?: string;

  onDownloadImageError() {
    this._imageSrc = this.DEFAULT_PRODUCT_IMAGE;
  }

  protected readonly DEFAULT_PRODUCT_IMAGE: string =
    'https://www.svgrepo.com/show/422038/product.svg';
}
