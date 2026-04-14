import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs/operators';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

import { HomeFacadeService } from '../home-facade.service';
import { HoldingsTableComponent } from '../components/holdings-table/holdings-table.component';
import { HoldingsChartComponent } from '../components/holdings-chart/holdings-chart.component';
import { AddHoldingDialogComponent } from '../components/add-holding-dialog/add-holding-dialog.component';
import { getErrorMessage } from '../../../core/utils/error-message.utils';

@Component({
  selector: 'app-home-page.component',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
  imports: [Card, Button, ProgressBar, HoldingsTableComponent, HoldingsChartComponent],
})
export class HomePageComponent implements OnInit {
  private readonly facade = inject(HomeFacadeService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoadingSignal = this.facade.isLoadingSignal;
  readonly isSavingSignal = this.facade.isSavingSignal;
  readonly holdingsSignal = this.facade.holdingsSignal;
  readonly companiesCount = this.facade.companiesCount;

  readonly skeletonRows = Array(8).fill(null);

  private dialogRef: DynamicDialogRef<AddHoldingDialogComponent> | null = null;

  ngOnInit(): void {
    this.facade.init();
  }

  openAddDialog(): void {
    this.dialogRef = this.dialogService.open(AddHoldingDialogComponent, {
      header: 'Dodaj firmę',
      width: '460px',
      modal: true,
      dismissableMask: true,
      closeOnEscape: true,
      closeAriaLabel: 'Zamknij dialog dodawania firmy',
      focusOnShow: true,
    }) as DynamicDialogRef<AddHoldingDialogComponent> | null;

    if (!this.dialogRef) return;

    this.dialogRef.onClose
      .pipe(
        filter(Boolean),
        switchMap((payload) => this.facade.addHolding(payload)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () =>
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Dane zostały zapisane',
            life: 3000,
          }),
        error: (error) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Wystąpił błąd',
            detail: getErrorMessage(error),
            life: 4000,
          }),
      });
  }
}
