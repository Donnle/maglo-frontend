import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TagSeverity } from '../../enums/tag.enum';

@Component({
  selector: 'app-tag',
  imports: [NgClass],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  severity: InputSignal<TagSeverity> = input<TagSeverity>(TagSeverity.Success);
}
