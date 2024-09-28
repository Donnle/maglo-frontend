import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AuthorizationContainerComponent } from './components/authorization-container/authorization-container.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    AuthorizationContainerComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent
  ]
})
export class AuthorizationModule {}
