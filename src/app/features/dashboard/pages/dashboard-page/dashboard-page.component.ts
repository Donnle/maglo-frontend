import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  workingCapitalPeriodControl: FormControl = new FormControl();
  chartOptions!: EChartsOption;

  ngOnInit() {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Income', 'Expenses'],
        itemGap: 30
      },
      xAxis: {
        type: 'category',
        data: [
          'Apr 14',
          'Apr 15',
          'Apr 16',
          'Apr 17',
          'Apr 18',
          'Apr 19',
          'Apr 20'
        ],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#78778B',
          fontSize: 12
        }
      },

      grid: {
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: '40px',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: '#f2f2f2'
          }
        },
        axisLabel: {
          formatter: (value: any) =>
            `$${value >= 1000 ? value / 1000 + 'K' : value}`,
          color: '#78778B',
          fontSize: 12
        }
      },
      series: [
        {
          name: 'Income',
          type: 'line',
          data: [5000, 5500, 5200, 5500, 4800, 5000, 5300],
          smooth: true,
          color: '#29A073',
          lineStyle: {
            width: 3
          }
        },
        {
          name: 'Expenses',
          type: 'line',
          data: [4800, 5300, 5000, 5400, 5100, 5200, 5100],
          smooth: true,
          color: '#C8EE44',
          lineStyle: {
            width: 3
          }
        }
      ]
    };
  }
  // data = [
  //   {
  //     legend: 'Income',
  //     color: '#29A073',
  //     dataPoints: [15, 40, 33, 45]
  //   },
  //   {
  //     legend: 'Expenses',
  //     color: '#C8EE44',
  //     dataPoints: [20, 30, 23, 15]
  //   }
  // ];
  //
  // series: any[] = [];
  // legends: any[] = [];
  //
  // constructor(private elm: ElementRef) {}
  //
  // ngAfterViewInit() {
  //   let stackchart = echarts.init(document.getElementById('mGraph_sale'));
  //
  //   this.data.forEach((x) => {
  //     this.series.push({
  //       name: x.legend,
  //       type: 'line',
  //       smooth: true,
  //       data: x.dataPoints,
  //       color: x.color
  //     });
  //
  //     this.legends.push(x.legend);
  //   });
  //
  //   stackchart.setOption({
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         label: { backgroundColor: '#68737c' }
  //       }
  //     },
  //     legend: { data: this.legends },
  //     grid: {
  //       left: '50px',
  //       right: '50px',
  //       bottom: '0%',
  //       top: '40px',
  //       containLabel: true
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',
  //         boundaryGap: false,
  //         data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         axisLine: {
  //           show: true
  //         },
  //         type: 'value'
  //       }
  //     ],
  //     series: this.series
  //   });
  // }
}
