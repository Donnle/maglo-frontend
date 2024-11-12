import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface VerticalTab {
  label: string;
  routerLink: string | string[];
  icon?: string;
}

@Component({
  selector: 'app-vertical-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './vertical-tabs.component.html',
  styleUrl: './vertical-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalTabsComponent {
  @Input({ required: true }) tabs: VerticalTab[] = [];
}
