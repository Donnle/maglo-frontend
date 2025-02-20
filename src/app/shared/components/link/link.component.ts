import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  link: InputSignal<string | string[]> = input<string | string[]>([]);
  showChevron: InputSignal<boolean> = input<boolean>(true);
}
