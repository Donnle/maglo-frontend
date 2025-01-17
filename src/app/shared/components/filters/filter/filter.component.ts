import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Filter, FilterType } from '../../../interfaces/filters.interface';
import { DropdownComponent } from '../../controllers/dropdown/dropdown.component';

@Component({
  selector: 'app-filter',
  imports: [DropdownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  @Input({ required: true }) type: FilterType = FilterType.Dropdown;
  @Input() options: Filter[] = [];
}
