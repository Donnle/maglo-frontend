import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BOTTOM_SIDEBAR, TOP_SIDEBAR } from '../../constants/sidebar.constant';
import { ButtonComponent } from '../../components/button/button.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { VerticalTabsComponent } from '../../components/vertical-tabs/vertical-tabs.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VerticalTab } from '../../interfaces/vertical-tab.interface';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonStyle
} from '../../enums/button.enum';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    ProfileComponent,
    VerticalTabsComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainerComponent {
  protected readonly TOP_SIDEBAR: VerticalTab[] = TOP_SIDEBAR;
  protected readonly BOTTOM_SIDEBAR: VerticalTab[] = BOTTOM_SIDEBAR;
  protected readonly ButtonSeverity: typeof ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize: typeof ButtonSize = ButtonSize;
  protected readonly ButtonStyle: typeof ButtonStyle = ButtonStyle;
}
