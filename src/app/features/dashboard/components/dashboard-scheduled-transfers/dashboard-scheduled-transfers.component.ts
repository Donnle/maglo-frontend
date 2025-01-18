import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-scheduled-transfers',
  standalone: false,
  templateUrl: './dashboard-scheduled-transfers.component.html',
  styleUrl: './dashboard-scheduled-transfers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardScheduledTransfersComponent {}
