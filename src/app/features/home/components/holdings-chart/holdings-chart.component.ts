import {
  Component,
  input,
  OnChanges,
  ChangeDetectionStrategy,
  computed,
  ViewChild,
  ElementRef,
  AfterViewInit, OnDestroy
} from '@angular/core';
import {ArcElement, Chart, ChartOptions, Legend, PieController, Tooltip} from 'chart.js';
import {Holding} from '../../../../core/models/holding.models';

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

Chart.register(ArcElement, PieController, Tooltip, Legend);

@Component({
  selector: 'app-holdings-chart',
  standalone: true,
  templateUrl: './holdings-chart.component.html',
  styleUrl: './holdings-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingsChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('pieCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly rows = input.required<Holding[]>();

  private chart: Chart<'pie'> | null = null;

  readonly chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toLocaleString('pl-PL')} akcji`,
        },
      },
    },
  };

  readonly chartLegendItems = computed(() =>
    this.rows().map((row, i) => ({
      label: row.companyName,
      value: row.sharesQuantity,
      color: CHART_COLORS[i % CHART_COLORS.length],
    }))
  );

  ngAfterViewInit(): void {
    if (this.canvasRef?.nativeElement) {
      this.createChart();
    }
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private createChart(): void {
    const data = this.rows();
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'pie',
      data: {
        labels: data.map((r) => r.companyName),
        datasets: [{
          data: data.map((r) => r.sharesQuantity),
          backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        }],
      },
      options: this.chartOptions,
    });
  }

  private updateChart(): void {
    const data = this.rows();
    this.chart!.data.labels = data.map((r) => r.companyName);
    this.chart!.data.datasets[0].data = data.map((r) => r.sharesQuantity);
    this.chart!.data.datasets[0].backgroundColor = data.map((_, i) =>
      CHART_COLORS[i % CHART_COLORS.length]
    );
    this.chart!.update();
  }
}
