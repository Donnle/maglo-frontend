import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { InvoicesCreatePageComponent } from './pages/invoices-create-page/invoices-create-page.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesPageComponent
  },
  {
    path: 'create',
    data: { title: 'Create Invoice' },
    component: InvoicesCreatePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {}
