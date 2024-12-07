import { Component, Input } from '@angular/core';
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
  styleUrl: './credit-card.component.scss'
})
export class CreditCardComponent {
  @Input() bankName: string = 'Universal Bank';
  @Input() cardNumbers: string = '1234567891234567';
  @Input() expireDate: Date | number = new Date();
  @Input() type: CreditCardType = CreditCardType.Visa;
  protected readonly CreditCardType = CreditCardType;
}
