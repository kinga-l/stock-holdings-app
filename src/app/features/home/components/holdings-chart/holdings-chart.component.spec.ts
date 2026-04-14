jest.mock('chart.js', () => ({
  Chart: Object.assign(
    jest.fn().mockImplementation(() => ({
      update: jest.fn(),
      destroy: jest.fn(),
      data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
    })),
    { register: jest.fn() }
  ),
  ArcElement: jest.fn(),
  PieController: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

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
    expect(comp.chartLegendItems().map(i => i.value)).toEqual([100, 200]);
    expect(comp.chartLegendItems().map(i => i.label)).toEqual(['Orlen', 'PKN']);
  });
});
