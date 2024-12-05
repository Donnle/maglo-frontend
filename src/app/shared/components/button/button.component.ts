import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
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
  @Input() severity: ButtonSeverity = ButtonSeverity.Primary;
  @Input() style: ButtonStyle = ButtonStyle.Default;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() type: ButtonType = ButtonType.Submit;
  @Input() outlined: boolean = false;

  // States
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  // Icon
  @Input() icon?: string | string[];

  // Tooltip
  @Input() tooltip?: string;

  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  protected readonly SpinnerSize: typeof SpinnerSize = SpinnerSize;
  protected readonly ButtonStyle: typeof ButtonStyle = ButtonStyle;

  onClick(event: Event) {
    this.click.emit(event);
  }
}
