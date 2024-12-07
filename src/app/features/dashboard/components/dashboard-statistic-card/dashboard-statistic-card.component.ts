import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-statistic-card',
  templateUrl: './dashboard-statistic-card.component.html',
  styleUrl: './dashboard-statistic-card.component.scss'
})
export class DashboardStatisticCardComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() value?: string | number | null;
}
