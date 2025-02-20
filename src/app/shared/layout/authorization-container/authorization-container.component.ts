import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './authorization-container.component.html',
  styleUrl: './authorization-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationContainerComponent {}
