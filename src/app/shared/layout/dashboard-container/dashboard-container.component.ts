import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit
} from '@angular/core';
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
import { RouteTitleService } from '../../services/route-title.service';
import { ThemeService } from '../../services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
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
export class DashboardContainerComponent implements OnInit {
  activeRouterTitle?: string = '';

  protected readonly TOP_SIDEBAR: VerticalTab[] = TOP_SIDEBAR;
  protected readonly BOTTOM_SIDEBAR: VerticalTab[] = BOTTOM_SIDEBAR;
  protected readonly ButtonSeverity: typeof ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize: typeof ButtonSize = ButtonSize;
  protected readonly ButtonStyle: typeof ButtonStyle = ButtonStyle;

  constructor(
    private routeTitleService: RouteTitleService,
    private themeService: ThemeService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.activeRouterTitle = this.routeTitleService.activeRouterTitle;

    this.routeTitleService.activeRouterTitle$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (routeTitle: string | undefined) => {
          this.activeRouterTitle = routeTitle;
        }
      });
  }

  onThemeChange() {
    this.themeService.toggleTheme();
  }
}
