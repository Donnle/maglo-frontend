import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';

@Component({
  selector: 'app-dashboard-statistic-card',
  templateUrl: './dashboard-statistic-card.component.html',
  styleUrl: './dashboard-statistic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatisticCardComponent {
  icon: InputSignal<string> = input<string>('');
  label: InputSignal<string> = input<string>('');
  value: InputSignal<string | number | undefined> = input<
    string | number | undefined
  >();

  isLoading: InputSignal<boolean> = input<boolean>(false);
}
