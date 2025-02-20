import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-recent-transactions',
  templateUrl: './dashboard-recent-transactions.component.html',
  styleUrl: './dashboard-recent-transactions.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardRecentTransactionsComponent {}
