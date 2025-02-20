import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWalletsPageComponent } from './pages/my-wallets-page/my-wallets-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyWalletsPageComponent
  },
  {
    path: 'test',
    component: MyWalletsPageComponent
  },
  {
    path: 'test3',
    component: MyWalletsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWalletsRoutingModule {}
