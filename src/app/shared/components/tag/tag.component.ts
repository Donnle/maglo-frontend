import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

export enum TagSeverity {
  Success = 'success',
  Secondary = 'secondary',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Contrast = 'contrast'
}

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [TagModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() severity: TagSeverity = TagSeverity.Success;
}
