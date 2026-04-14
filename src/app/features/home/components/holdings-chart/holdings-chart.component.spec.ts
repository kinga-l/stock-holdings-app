import { render } from '@testing-library/angular';
import { HoldingsChartComponent } from './holdings-chart.component';
import { Holding } from '../../../../core/models/holding.models';

const mockHoldings: Holding[] = [
  {
    companyName: 'Orlen',
    sharesQuantity: 100,
    grossPrice: 1000,
    netPrice: 813,
    id: 0,
  },
  {
    companyName: 'PKN',
    sharesQuantity: 200,
    grossPrice: 2000,
    netPrice: 1626,
    id: 0,
  },
];

describe('HoldingsChartComponent', () => {
  it('renderuje canvas dla niepustych danych', async () => {
    const { container } = await render(HoldingsChartComponent, {
      componentInputs: { rows: mockHoldings },
    });
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('buduje dataset z ilości akcji', async () => {
    const { fixture } = await render(HoldingsChartComponent, {
      componentInputs: { rows: mockHoldings },
    });
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    expect(comp.chartData.datasets[0].data).toEqual([100, 200]);
    expect(comp.chartData.labels).toEqual(['Orlen', 'PKN']);
  });
});
