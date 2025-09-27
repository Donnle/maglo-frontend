import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonStyle
} from '../../enums/button.enum';
import { ThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './authorization-container.component.html',
  styleUrl: './authorization-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationContainerComponent {
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonStyle = ButtonStyle;
  protected readonly ButtonSize = ButtonSize;

  constructor(private themeService: ThemeService ) {
  }

  onThemeChange() {
    this.themeService.toggleTheme();
  }
}
