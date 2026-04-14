import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WsMessageDto } from '../models/api.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private socket$: WebSocketSubject<WsMessageDto> | null = null;

  connect(): Observable<WsMessageDto> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket<WsMessageDto>(environment.wsUrl);
    }
    return this.socket$.pipe(
      retry({ count: 3, delay: 2000 }),
      catchError(() => EMPTY)
    );
  }

  ngOnDestroy(): void {
    this.socket$?.complete();
  }
}
