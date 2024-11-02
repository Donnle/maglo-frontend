import { Routes } from '@angular/router';
import { developmentGuard } from './core/guards/development.guard';
import { DashboardContainerComponent } from './shared/layout/dashboard-container/dashboard-container.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    children: [
      {
        path: 'main',
        title: 'Dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          )
      },
      {
        path: 'transactions',
        title: 'Transactions',
        loadChildren: () =>
          import('./features/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          )
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
      }
    ]
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./features/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      )
  },
  {
    path: 'ui-toolkit',
    canActivate: [developmentGuard],
    loadChildren: () =>
      import('./features/ui-toolkit/ui-toolkit.module').then(
        (m) => m.UiToolkitModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];
