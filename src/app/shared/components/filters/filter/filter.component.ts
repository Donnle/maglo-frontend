import { Component, Input } from '@angular/core';
import {
  FilterOption,
  FilterType
} from '../../../interfaces/filters.interface';
import { DropdownComponent } from '../../controllers/dropdown/dropdown.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input({ required: true }) type: FilterType = FilterType.Dropdown;
  @Input() options: FilterOption[] = [];
}
