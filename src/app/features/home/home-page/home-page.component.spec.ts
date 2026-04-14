import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal, computed } from '@angular/core';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HomePageComponent } from './home-page.component';
import { HomeFacadeService } from '../home-facade.service';

const mockFacade = {
  state$: of({ holdings: [], isLoading: false, isSaving: false, error: null }),
  isLoadingSignal: signal(false),
  isSavingSignal: signal(false),
  holdingsSignal: signal([]),
  errorSignal: signal<string | null>(null),
  companiesCount: computed(() => 0),
  init: jest.fn(),
  addHolding: jest.fn().mockReturnValue(of(void 0)),
};

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        MessageService,
        { provide: HomeFacadeService, useValue: mockFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('wywołuje facade.init() przy OnInit', () => {
    fixture.detectChanges();
    expect(mockFacade.init).toHaveBeenCalled();
  });
});
