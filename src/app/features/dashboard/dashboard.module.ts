import { NgModule } from '@angular/core';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardStatisticCardComponent } from './components/dashboard-statistic-card/dashboard-statistic-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardWorkingCapitalComponent } from './components/dashboard-working-capital/dashboard-working-capital.component';
import { DashboardWorkingCapitalChartComponent } from './components/dashboard-working-capital/dashboard-working-capital-chart/dashboard-working-capital-chart.component';
import { DashboardRecentTransactionsComponent } from './components/dashboard-recent-transactions/dashboard-recent-transactions.component';
import { DashboardWalletsComponent } from './components/dashboard-wallets/dashboard-wallets.component';
import { DashboardScheduledTransfersComponent } from './components/dashboard-scheduled-transfers/dashboard-scheduled-transfers.component';
import { DropdownComponent } from '../../shared/components/controllers/dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QueryControlDirective } from '../../shared/directives/query-control.directive';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { CreditCardComponent } from '../../shared/components/credit-card/credit-card.component';
import { SkeletonDirective } from '../../shared/directives/skeleton-loading.directive';
import { TransactionProductComponent } from '../../shared/components/transaction/transaction-product/transaction-product.component';
import { LinkComponent } from '../../shared/components/link/link.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardStatisticCardComponent,
    DashboardWorkingCapitalComponent,
    DashboardWorkingCapitalChartComponent,
    DashboardRecentTransactionsComponent,
    DashboardWalletsComponent,
    DashboardScheduledTransfersComponent
  ],
  imports: [
    DashboardRoutingModule,
    DropdownComponent,
    ReactiveFormsModule,
    QueryControlDirective,
    NgStyle,
    NgClass,
    CurrencyPipe,
    CreditCardComponent,
    SkeletonDirective,
    TransactionProductComponent,
    LinkComponent
  ]
})
export class DashboardModule {}
