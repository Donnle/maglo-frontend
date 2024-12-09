import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CreditCardType } from '../../enums/credit-card.enum';
import { CardNumbersPipe } from '../../pipes/card-numbers.pipe';
import { CopyToClipboardDirective } from '../../directives/copy-to-clipboard.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [
    DatePipe,
    CardNumbersPipe,
    CopyToClipboardDirective,
    TooltipDirective
  ],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardComponent {
  bankName: InputSignal<string> = input<string>('Universal Bank');
  cardNumbers: InputSignal<string> = input<string>('1234567891234567');
  expireDate: InputSignal<Date | number> = input<Date | number>(new Date());
  type: InputSignal<CreditCardType> = input<CreditCardType>(
    CreditCardType.Visa
  );

  protected readonly CreditCardType = CreditCardType;
}
