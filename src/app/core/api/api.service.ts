import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetDataResponseDto, GetDataItemDto, SaveDataRequestDto } from '../models/api.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  getData(): Observable<GetDataItemDto[]> {
    return this.http
      .get<GetDataResponseDto>('/api/get_data')
      .pipe(map((response) => response.data));
  }

  saveData(payload: SaveDataRequestDto): Observable<void> {
    return this.http.post<void>('/api/save_data', payload);
  }
}
