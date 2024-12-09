import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { TooltipStyle } from '../../enums/tooltip.enum';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  imports: [NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
  style: TooltipStyle = TooltipStyle.Default;
  tooltip: string = '';
  left: number = 0;
  top: number = 0;
  visible: boolean = false;
}
