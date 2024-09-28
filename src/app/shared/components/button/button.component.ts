import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgClass } from '@angular/common';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export enum ButtonSeverity {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success'
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Wide = 'wide'
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SpinnerComponent, NgClass, Button, TooltipModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  // Styles
  @Input() severity: ButtonSeverity = ButtonSeverity.Primary;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() outlined: boolean = false;

  // States
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  // Icon
  @Input() icon?: string;

  // Tooltip
  @Input() tooltip?: string;
}
