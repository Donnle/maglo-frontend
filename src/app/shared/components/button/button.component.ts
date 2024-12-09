import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef
} from '@angular/core';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonStyle,
  ButtonType
} from '../../enums/button.enum';
import { SpinnerSize } from '../../enums/spiner.enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  // Styles
  style: InputSignal<ButtonStyle> = input<ButtonStyle>(ButtonStyle.Default);
  size: InputSignal<ButtonSize> = input<ButtonSize>(ButtonSize.Medium);
  type: InputSignal<ButtonType> = input<ButtonType>(ButtonType.Submit);
  severity: InputSignal<ButtonSeverity> = input<ButtonSeverity>(
    ButtonSeverity.Primary
  );

  outlined: InputSignal<boolean> = input<boolean>(false);

  // States
  disabled: InputSignal<boolean> = input<boolean>(false);
  loading: InputSignal<boolean> = input<boolean>(false);

  // Icon
  icon: InputSignal<string | string[] | undefined> = input<
    string | string[] | undefined
  >();

  // Tooltip
  tooltip: InputSignal<string | undefined> = input<string | undefined>();

  click: OutputEmitterRef<Event> = output<Event>();

  protected readonly SpinnerSize: typeof SpinnerSize = SpinnerSize;
  protected readonly ButtonStyle: typeof ButtonStyle = ButtonStyle;

  onClick(event: Event) {
    this.click.emit(event);
  }
}
