import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { TIME_RANGE } from '../../../../shared/constants/time-range.constant';
import { DropdownItem } from '../../../../shared/interfaces/dropdown.interface';
import { TimeRange } from '../../../../shared/enums/time-range.enum';
import { delay, finalize, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from '../../../../shared/interfaces/option.interface';
import { DashboardWorkingChartLegend } from '../../interfaces/dashboard-working-capital-chart.interface';

@Component({
  selector: 'app-dashboard-working-capital',
  templateUrl: './dashboard-working-capital.component.html',
  styleUrl: './dashboard-working-capital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWorkingCapitalComponent implements OnInit, AfterViewInit {
  filterForm!: FormGroup;

  cards: InputSignal<Option[]> = input<Option[]>([]);
  datasets: WritableSignal<any[]> = signal([]);
  legends: WritableSignal<DashboardWorkingChartLegend[]> = signal([]);

  isWorkingCapitalLoading: WritableSignal<boolean> = signal(false);

  protected readonly TIME_RANGE: DropdownItem[] = TIME_RANGE;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.getWorkingCapital(this.filterForm.value);
  }

  private getWorkingCapital(params: any) {
    this.isWorkingCapitalLoading.set(true);

    of(params)
      .pipe(delay(2000))
      .pipe(finalize(() => this.isWorkingCapitalLoading.set(false)))
      .subscribe({
        next: (data) => {
          this.datasets.set([
            132, 224, 133, 233, 142, 345, 341, 334, 46, 35, 435
          ]);
          // console.log('test', data);
        }
      });
  }

  private initForm() {
    this.filterForm = this.formBuilder.group({
      card: ['', Validators.required],
      range: [TimeRange.LastYear, Validators.required]
    });
  }
}
