import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { ApiService } from '../../core/api/api.service';
import { WebsocketService } from '../../core/ws/websocket.service';
import { mapHoldingDtosToModel, mapHoldingDtosWsToModel } from '../../core/mappers/holding.mapper';
import { mergeHoldings } from '../../core/utils/merge-holdings.utils';
import { HomeState, Holding } from '../../core/models/holding.models';
import { SaveDataRequestDto } from '../../core/models/api.models';

const INITIAL_STATE: HomeState = {
  holdings: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class HomeFacadeService {
  private readonly api = inject(ApiService);
  private readonly ws = inject(WebsocketService);

  private readonly stateSubject$ = new BehaviorSubject<HomeState>(INITIAL_STATE);

  readonly isLoadingSignal = signal(false);
  readonly isSavingSignal = signal(false);
  readonly holdingsSignal = signal<Holding[]>([]);
  readonly errorSignal = signal<string | null>(null);

  readonly companiesCount = computed(() => this.holdingsSignal().length);

  init(): void {
    this.patch({ isLoading: true, error: null });
    this.isLoadingSignal.set(true);
    this.api
      .getData()
      .pipe(
        map(mapHoldingDtosToModel),
        tap((holdings) => {
          this.patch({ holdings, isLoading: false });
          this.holdingsSignal.set(holdings);
          this.isLoadingSignal.set(false);
        }),
        catchError(() => {
          const error = 'Nie udało się pobrać danych. Spróbuj ponownie.';
          this.patch({ isLoading: false, error });
          this.isLoadingSignal.set(false);
          this.errorSignal.set(error);
          return EMPTY;
        })
      )
      .subscribe();

    this.ws
      .connect()
      .pipe(
        filter((msg) => msg.type === 'price_update'),
        map((msg) => msg.data),
        map(mapHoldingDtosWsToModel),
        tap((incoming) => {
          const merged = mergeHoldings(this.stateSubject$.value.holdings, incoming);
          this.patch({ holdings: merged });
          this.holdingsSignal.set(merged);
        }),
        catchError(() => EMPTY)
      )
      .subscribe();
  }

  addHolding(payload: SaveDataRequestDto): Observable<void> {
    this.patch({ isSaving: true, error: null });
    this.isSavingSignal.set(true);

    return this.api.saveData(payload).pipe(
      switchMap(() => this.api.getData()),
      map(mapHoldingDtosToModel),
      tap((holdings) => {
        this.patch({ holdings, isSaving: false });
        this.holdingsSignal.set(holdings);
        this.isSavingSignal.set(false);
      }),
      map(() => void 0),
      catchError(() => {
        const error = 'Nie udało się zapisać danych.';
        this.patch({ isSaving: false, error });
        this.isSavingSignal.set(false);
        this.errorSignal.set(error);
        return throwError(() => new Error(error));
      })
    );
  }

  private patch(partial: Partial<HomeState>): void {
    this.stateSubject$.next({
      ...this.stateSubject$.value,
      ...partial,
    });
  }
}
