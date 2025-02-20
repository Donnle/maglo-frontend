import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/enums/button.enum';
import { CreditCardType } from '../../../../shared/enums/credit-card.enum';

@Component({
  selector: 'app-dashboard-wallets',
  templateUrl: './dashboard-wallets.component.html',
  styleUrl: './dashboard-wallets.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWalletsComponent {
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize = ButtonSize;

  creditCards = [
    {
      type: CreditCardType.Visa,
      number: '2133 2433 2134 4242',
      expirationDate: '12/2020'
    }
  ];

  protected readonly CreditCardType = CreditCardType;
}
