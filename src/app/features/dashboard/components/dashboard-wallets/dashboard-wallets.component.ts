import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-wallets',
  templateUrl: './dashboard-wallets.component.html',
  styleUrl: './dashboard-wallets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWalletsComponent {}
