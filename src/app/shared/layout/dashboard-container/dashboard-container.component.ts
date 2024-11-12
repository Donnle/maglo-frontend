import { Component } from '@angular/core';
import { BOTTOM_SIDEBAR, TOP_SIDEBAR } from '../../constants/sidebar.constant';
import {
  ButtonComponent,
  ButtonSeverity,
  ButtonSize,
  ButtonStyle
} from '../../components/button/button.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { VerticalTabsComponent } from '../../components/vertical-tabs/vertical-tabs.component';
import { RouterLink, RouterOutlet } from '@angular/router';

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
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  protected readonly TOP_SIDEBAR = TOP_SIDEBAR;
  protected readonly BOTTOM_SIDEBAR = BOTTOM_SIDEBAR;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonStyle = ButtonStyle;
}
