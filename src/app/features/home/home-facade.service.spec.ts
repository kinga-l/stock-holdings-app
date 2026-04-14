import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeFacadeService } from './home-facade.service';
import { ApiService } from '../../core/api/api.service';
import { WebsocketService } from '../../core/ws/websocket.service';

const mockApiService = {
  getData: jest.fn().mockReturnValue(of([])),
  saveData: jest.fn().mockReturnValue(of(void 0)),
};

const mockWsService = {
  connect: jest.fn().mockReturnValue(of([])),
};

describe('HomeFacadeService', () => {
  let service: HomeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeFacadeService,
        { provide: ApiService, useValue: mockApiService },
        { provide: WebsocketService, useValue: mockWsService },
      ],
    });
    service = TestBed.inject(HomeFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('init() pobiera dane i ustawia holdings', () => {
    service.init();
    expect(mockApiService.getData).toHaveBeenCalled();
    expect(service.holdingsSignal()).toEqual([]);
  });
});
