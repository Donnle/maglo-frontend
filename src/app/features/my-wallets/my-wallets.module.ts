import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWalletsRoutingModule } from './my-wallets-routing.module';
import { MyWalletsPageComponent } from './pages/my-wallets-page/my-wallets-page.component';
import { HorizontalTabsComponent } from '../../shared/components/horizontal-tabs/horizontal-tabs.component';
import { MyWalletsBalanceComponent } from './components/my-wallets-balance/my-wallets-balance.component';
import { SkeletonDirective } from '../../shared/directives/skeleton-loading.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';

@NgModule({
  declarations: [MyWalletsPageComponent, MyWalletsBalanceComponent],
  imports: [
    CommonModule,
    MyWalletsRoutingModule,
    HorizontalTabsComponent,
    SkeletonDirective,
    ButtonComponent
  ]
})
export class MyWalletsModule {}
