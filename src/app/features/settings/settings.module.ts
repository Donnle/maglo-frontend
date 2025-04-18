import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { InputComponent } from '../../shared/components/controllers/input/input.component';
import { DatePickerComponent } from '../../shared/components/controllers/date-picker/date-picker.component';
import { InputPasswordComponent } from '../../shared/components/controllers/input-password/input-password.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    InputComponent,
    DatePickerComponent,
    InputPasswordComponent,
    ButtonComponent,
    ReactiveFormsModule
  ]
})
export class SettingsModule {}
