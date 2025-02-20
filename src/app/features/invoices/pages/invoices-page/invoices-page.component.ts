import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-invoices-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoices-page.component.html',
  styleUrl: './invoices-page.component.scss'
})
export class InvoicesPageComponent {}
