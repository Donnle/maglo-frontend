import { NgModule } from '@angular/core';
import { CurrencyPipe, JsonPipe, NgClass, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { DropdownComponent } from '../../shared/components/controllers/dropdown/dropdown.component';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardStatisticCardComponent } from './components/dashboard-statistic-card/dashboard-statistic-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableLoadingDirective } from '../../shared/directives/table-loading.directive';
import { DashboardWorkingCapitalComponent } from './components/dashboard-working-capital/dashboard-working-capital.component';
import { QueryControlDirective } from '../../shared/directives/query-control.directive';
import { CreditCardComponent } from '../../shared/components/credit-card/credit-card.component';
import { DashboardWorkingCapitalChartComponent } from './components/dashboard-working-capital/dashboard-working-capital-chart/dashboard-working-capital-chart.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { SkeletonDirective } from '../../shared/directives/skeleton-loading.directive';
import { DashboardRecentTransactionsComponent } from './components/dashboard-recent-transactions/dashboard-recent-transactions.component';
import { TransactionProductComponent } from '../../shared/components/transaction/transaction-product/transaction-product.component';
import { DashboardWalletsComponent } from './components/dashboard-wallets/dashboard-wallets.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardStatisticCardComponent,
    DashboardWorkingCapitalComponent,
    DashboardWorkingCapitalChartComponent,
    DashboardRecentTransactionsComponent,
    DashboardWalletsComponent
  ],
  imports: [
    DashboardRoutingModule,
    ButtonComponent,
    NgClass,
    DropdownComponent,
    ReactiveFormsModule,
    TableLoadingDirective,
    QueryControlDirective,
    FormsModule,
    CreditCardComponent,
    CurrencyPipe,
    SkeletonLoaderComponent,
    SkeletonDirective,
    JsonPipe,
    NgStyle,
    TransactionProductComponent
  ]
})
export class DashboardModule {}
