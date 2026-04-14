import { TestBed, ComponentFixture } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { HoldingsTableComponent } from './holdings-table.component';
import { Holding } from '../../../../core/models/holding.models';

registerLocaleData(localePl);

const mockRows: Holding[] = [
  { id: 1, companyName: 'Orlen', sharesQuantity: 100, grossPrice: 1000, netPrice: 813 },
];

describe('HoldingsTableComponent', () => {
  let fixture: ComponentFixture<HoldingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldingsTableComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingsTableComponent);
    fixture.componentRef.setInput('rows', mockRows);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('wyświetla dane z input rows', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Orlen');
  });

  it('wyświetla komunikat gdy brak danych', () => {
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Brak danych');
  });
});
