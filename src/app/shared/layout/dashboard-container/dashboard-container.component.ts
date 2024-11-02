import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { BOTTOM_SIDEBAR, TOP_SIDEBAR } from '../../constants/sidebar.constant';
import {
  ButtonComponent,
  ButtonSeverity,
  ButtonSize
} from '../../components/button/button.component';
import { ProfileComponent } from '../../components/profile/profile.component';

@Component({
  standalone: true,
  imports: [MenuModule, ButtonComponent, ProfileComponent],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  protected readonly TOP_SIDEBAR = TOP_SIDEBAR;
  protected readonly BOTTOM_SIDEBAR = BOTTOM_SIDEBAR;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize = ButtonSize;
}
