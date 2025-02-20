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
        title: 'Dashboard2',
        data: { title: 'Dashboard' },
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          )
      },
      {
        path: 'transactions',
        title: 'Transactions',
        data: { title: 'Transactions' },
        loadChildren: () =>
          import('./features/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          )
      },
      {
        path: 'invoices',
        title: 'Invoices',
        data: { title: 'Invoices' },
        loadChildren: () =>
          import('./features/invoices/invoices.module').then(
            (m) => m.InvoicesModule
          )
      },
      {
        path: 'my-wallets',
        title: 'My wallets',
        data: { title: 'My Wallets' },
        loadChildren: () =>
          import('./features/my-wallets/my-wallets.module').then(
            (m) => m.MyWalletsModule
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
  },
  // TODO: Add 404 page ???
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
