import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';

@Component({
  selector: 'app-transaction-product',
  imports: [],
  templateUrl: './transaction-product.component.html',
  styleUrl: './transaction-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionProductComponent {
  protected readonly DEFAULT_PRODUCT_IMAGE: string =
    'https://www.svgrepo.com/show/422038/product.svg';

  name: InputSignal<string> = input('Iphone 13 Pro MAX');
  category: InputSignal<string> = input('Apple. Inc');
  imageSrc: InputSignal<string> = input(this.DEFAULT_PRODUCT_IMAGE, {
    transform: (imageSrc: string): string => {
      this._imageSrc = imageSrc;
      return imageSrc;
    }
  });

  _imageSrc: string = this.DEFAULT_PRODUCT_IMAGE;

  onDownloadImageError() {
    this._imageSrc = this.DEFAULT_PRODUCT_IMAGE;
  }
}
