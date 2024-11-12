import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum SpinnerSize {
  Small = 'small',
  Default = 'default'
}

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
