import { Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TooltipStyle } from '../../enums/tooltip.enum';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  imports: [NgClass],
})
export class TooltipComponent {
  style: InputSignal<TooltipStyle> = input<TooltipStyle>(TooltipStyle.Default);
  tooltip: InputSignal<string> = input('');
  left: InputSignal<number> = input(0);
  top: InputSignal<number> = input(0);
  visible: InputSignal<boolean> = input(false);
}
