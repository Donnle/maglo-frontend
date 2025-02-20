import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/enums/button.enum';

@Component({
  selector: 'app-invoices-client-card',
  standalone: false,
  templateUrl: './invoices-client-card.component.html',
  styleUrl: './invoices-client-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesClientCardComponent {
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize = ButtonSize;
}
