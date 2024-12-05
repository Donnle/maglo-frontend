import { DBEntity } from '../database.interface';
import { BaseProduct } from '../product/product.interface';
import { TransactionStatus } from '../../../enums/api/transaction/transaction.enum';

export interface Transaction extends BaseTransaction {}

export interface BaseTransaction extends DBEntity {
  product: BaseProduct;
  countProducts: number;
  status: TransactionStatus;
  date: string;
}
