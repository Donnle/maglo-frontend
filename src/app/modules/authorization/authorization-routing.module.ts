import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AuthorizationContainerComponent } from './components/authorization-container/authorization-container.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationContainerComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInPageComponent
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
