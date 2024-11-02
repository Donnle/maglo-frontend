import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.scss'
})
export class StatisticCardComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() value?: string;
}
