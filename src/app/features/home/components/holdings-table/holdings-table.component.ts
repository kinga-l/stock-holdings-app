import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Holding } from '../../../../core/models/holding.models';

@Component({
  selector: 'app-holdings-table',
  standalone: true,
  templateUrl: './holdings-table.component.html',
  styleUrl: './holdings-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, CurrencyPipe, DecimalPipe],
})
export class HoldingsTableComponent {
  readonly rows = input.required<Holding[]>();
}
