import { Component, input, OnChanges, ChangeDetectionStrategy, computed } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Holding } from '../../../../core/models/holding.models';

export const CHART_COLORS: string[] = [
  '#AF486E',
  '#B3485B',
  '#B44947',
  '#B34D31',
  '#B05215',
  '#964C00',
  '#8F5300',
  '#855A00',
  '#796000',
  '#6B6700',
  '#5A6C00',
  '#48780A',
  '#297C2D',
  '#007F44',
  '#008159',
  '#00816B',
  '#007774',
  '#007484',
  '#007192',
  '#007EB0',
  '#0079BA',
  '#2673BF',
  '#466DC2',
  '#5C66C1',
  '#6F60BD',
  '#7E5BB6',
  '#8C55AB',
  '#98519F',
  '#A24D90',
  '#AA4A7F',
];

@Component({
  selector: 'app-holdings-chart',
  standalone: true,
  templateUrl: './holdings-chart.component.html',
  styleUrl: './holdings-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
})
export class HoldingsChartComponent implements OnChanges {
  readonly rows = input.required<Holding[]>();

  readonly chartType = 'pie' as const;

  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  };

  readonly chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toLocaleString('pl-PL')} akcji`,
        },
      },
    },
  };

  private getColor(index: number): string {
    return CHART_COLORS[index % CHART_COLORS.length];
  }

  readonly chartLegendItems = computed(() => {
    const data = this.rows();
    return data.map((row, index) => ({
      label: row.companyName,
      value: row.sharesQuantity,
      color: this.getColor(index),
    }));
  });

  ngOnChanges(): void {
    const data = this.rows();
    this.chartData = {
      labels: data.map((r) => r.companyName),
      datasets: [
        {
          data: data.map((r) => r.sharesQuantity),
          backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        },
      ],
    };
  }
}
