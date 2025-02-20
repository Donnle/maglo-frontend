import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSeverity } from '../../../../shared/enums/button.enum';
import { TagSeverity } from '../../../../shared/enums/tag.enum';

@Component({
  selector: 'app-invoices-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoices-page.component.html',
  styleUrl: './invoices-page.component.scss'
})
export class InvoicesPageComponent {
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly TagSeverity = TagSeverity;
}
