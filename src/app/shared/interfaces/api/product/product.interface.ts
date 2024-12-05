import { DBEntity } from '../database.interface';
import { Currency } from '../../../enums/api/currency/currency.enum';

export interface Product extends BaseProduct {}

export interface BaseProduct extends DBEntity {
  name: string;
  image: string;
  category: string;
  price: number;
  currency: Currency;
}

export interface ProductType {}
