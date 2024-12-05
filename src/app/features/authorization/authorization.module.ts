import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { AuthorizationRoutingModule } from './authorization-routing.module';

// Pages
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

// Layout
import { AuthorizationContainerComponent } from '../../shared/layout/authorization-container/authorization-container.component';

// Shared
import { InputComponent } from '../../shared/components/controllers/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CheckboxComponent } from '../../shared/components/controllers/checkbox/checkbox.component';
import { InputPasswordComponent } from '../../shared/components/controllers/input-password/input-password.component';

const components = [
  InputComponent,
  InputPasswordComponent,
  ButtonComponent,
  CheckboxComponent,
  AuthorizationContainerComponent
];

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    ...components
  ]
})
export class AuthorizationModule {}
