import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagSeverity } from '../../enums/tag.enum';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() severity: TagSeverity = TagSeverity.Success;
}
