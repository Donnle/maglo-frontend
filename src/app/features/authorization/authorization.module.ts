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
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';

const components = [
  InputComponent,
  PasswordInputComponent,
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
