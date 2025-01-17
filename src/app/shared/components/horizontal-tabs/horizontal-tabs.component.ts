import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HorizontalTab } from '../../interfaces/horizontal-tab.interface';

@Component({
  selector: 'app-horizontal-tabs',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './horizontal-tabs.component.html',
  styleUrl: './horizontal-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalTabsComponent {
  tabs: InputSignal<HorizontalTab[]> = input.required<HorizontalTab[]>();
}
