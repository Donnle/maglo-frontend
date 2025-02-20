interface DashboardWorkingChartDatasetItem {
  date: string;
  amount: number;
}

export interface DashboardWorkingChartDataset {
  incomes: DashboardWorkingChartDatasetItem[];
  expenses: DashboardWorkingChartDatasetItem[];
}

export interface DashboardWorkingChartLegend {
  label: string;
  color: string;
}
