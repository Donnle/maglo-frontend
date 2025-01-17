import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Filter } from '../../interfaces/filters.interface';
import { FormGroup } from '@angular/forms';

// TODO: Not ready
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  @Input({ required: true }) filters: Filter[] = [];
  @Input({ required: true }) form!: FormGroup;
}
