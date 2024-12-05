import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiToolkitRoutingModule } from './ui-toolkit-routing.module';
import { UiToolkitPageComponent } from './pages/ui-toolkit-page/ui-toolkit-page.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { InputComponent } from '../../shared/components/controllers/input/input.component';
import { DropdownComponent } from '../../shared/components/controllers/dropdown/dropdown.component';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../shared/components/controllers/checkbox/checkbox.component';
import { MultiDropdownComponent } from '../../shared/components/controllers/multi-dropdown/multi-dropdown.component';
import { QueryControlDirective } from '../../shared/directives/query-control.directive';

@NgModule({
  declarations: [UiToolkitPageComponent],
  imports: [
    CommonModule,
    UiToolkitRoutingModule,
    ButtonComponent,
    SpinnerComponent,
    InputComponent,
    DropdownComponent,
    TagComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    MultiDropdownComponent,
    QueryControlDirective
  ]
})
export class UiToolkitModule {}
