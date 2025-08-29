import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpPageComponent } from './pages/help-page/help-page.component';

const routes: Routes = [
  {
    path: '',
    title: 'Help',
    data: { title: 'Help' },
    component: HelpPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {}
