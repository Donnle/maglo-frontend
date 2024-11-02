import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [DashboardPageComponent, StatisticCardComponent],
  imports: [
    DashboardRoutingModule,
    PanelMenuModule,
    MenuModule,
    ButtonComponent,
    NgClass,
    NgxEchartsDirective,
    DropdownComponent,
    CardModule
  ]
})
export class DashboardModule {}
