import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpinnerSize } from '../../enums/spiner.enum';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = SpinnerSize.Default;
}
