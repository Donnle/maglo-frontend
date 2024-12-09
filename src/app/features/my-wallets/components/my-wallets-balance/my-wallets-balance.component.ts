import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';

@Component({
  selector: 'app-my-wallets-balance',
  templateUrl: './my-wallets-balance.component.html',
  styleUrl: './my-wallets-balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWalletsBalanceComponent {
  balance: InputSignal<number> = input<number>(5240);
  profitPercentage: InputSignal<number> = input<number>(12);
  isLoading: InputSignal<boolean> = input<boolean>(false);
}
