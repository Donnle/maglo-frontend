import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiToolkitPageComponent } from './pages/ui-toolkit-page/ui-toolkit-page.component';

const routes: Routes = [{ path: '', component: UiToolkitPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiToolkitRoutingModule {}
