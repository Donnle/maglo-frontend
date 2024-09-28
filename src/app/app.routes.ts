import { Routes } from '@angular/router';
import { developmentGuard } from './core/guards/development.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      )
  },
  {
    path: 'ui-toolkit',
    canActivate: [developmentGuard],
    loadChildren: () =>
      import('./modules/ui-toolkit/ui-toolkit.module').then(
        (m) => m.UiToolkitModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];
