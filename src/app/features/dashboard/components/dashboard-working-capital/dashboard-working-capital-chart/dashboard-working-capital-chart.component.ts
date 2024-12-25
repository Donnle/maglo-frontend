import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  InputSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  Signal,
  SimpleChange,
  SimpleChanges,
  viewChild
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartDataset,
  registerables
} from 'chart.js';
import { createDashboardWorkingCapitalChartConfig } from '../../../utils/dashboard-working-capital-chart.util';
import {
  DashboardWorkingChartDataset,
  DashboardWorkingChartLegend
} from '../../../interfaces/dashboard-working-capital-chart.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-working-capital-chart',
  templateUrl: './dashboard-working-capital-chart.component.html',
  styleUrl: './dashboard-working-capital-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWorkingCapitalChartComponent
  implements AfterViewInit, OnChanges
{
  private readonly chart: Signal<ElementRef<HTMLCanvasElement>> =
    viewChild.required<ElementRef<HTMLCanvasElement>>('chart');

  datasets: InputSignal<DashboardWorkingChartDataset | undefined> =
    input<DashboardWorkingChartDataset>();

  legends: InputSignal<DashboardWorkingChartLegend[]> = input<
    DashboardWorkingChartLegend[]
  >([]);

  legendsChange: OutputEmitterRef<DashboardWorkingChartLegend[]> =
    output<DashboardWorkingChartLegend[]>();

  private chartRef?: Chart;

  ngAfterViewInit() {
    this.upsertChart([132, 224, 133, 233, 142, 345, 341, 334, 46, 35, 435]);
  }

  ngOnChanges(changes: SimpleChanges) {
    const datasets: SimpleChange = changes['datasets'];

    if (this.chart() && datasets && !datasets.firstChange) {
      this.upsertChart(datasets.currentValue);
    }
  }

  private upsertChart(test: any[]) {
    if (this.chartRef) {
      this.chartRef.destroy();
      this.legendsChange.emit([]);
    }

    const chartElement: HTMLCanvasElement = this.chart().nativeElement;
    const chartConfig: ChartConfiguration<'line'> = this.getChartConfig(test);
    this.chartRef = new Chart(chartElement, chartConfig);

    const chartData: ChartData = this.chartRef!.data;
    const legends: DashboardWorkingChartLegend[] = chartData.datasets.map(
      (chartDataItem: ChartDataset): DashboardWorkingChartLegend => ({
        color: chartDataItem.borderColor as string,
        label: chartDataItem.label!
      })
    );

    this.legendsChange.emit(legends);
  }

  private getChartConfig(test: any[]): ChartConfiguration<'line'> {
    return createDashboardWorkingCapitalChartConfig(test);
  }
}
