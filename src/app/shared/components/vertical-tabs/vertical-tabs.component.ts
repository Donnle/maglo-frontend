import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VerticalTab } from '../../interfaces/vertical-tab.interface';

@Component({
  selector: 'app-vertical-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './vertical-tabs.component.html',
  styleUrl: './vertical-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalTabsComponent {
  tabs: InputSignal<VerticalTab[]> = input.required<VerticalTab[]>();
}
