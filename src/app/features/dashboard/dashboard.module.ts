import { NgModule } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsDirective } from 'ngx-echarts';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { DropdownComponent } from '../../shared/components/controllers/dropdown/dropdown.component';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableLoadingDirective } from '../../shared/directives/table-loading.directive';

@NgModule({
  declarations: [DashboardPageComponent, StatisticCardComponent],
  imports: [
    DashboardRoutingModule,
    ButtonComponent,
    NgClass,
    NgxEchartsDirective,
    DropdownComponent,
    ReactiveFormsModule,
    TableLoadingDirective
  ]
})
export class DashboardModule {}
