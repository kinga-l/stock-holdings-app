# Stock Holdings App

Aplikacja do ewidencji akcji i ich wartości z aktualizacją cen w czasie rzeczywistym.

## Tech Stack

- **Angular 20** - standalone components, Signals
- **PrimeNG 20** - komponenty UI
- **Chart.js + ng2-charts** - wykres kołowy
- **RxJS webSocketSubject** - aktualizacje cen w czasie rzeczywistym
- **Jest + Angular Testing Library** - testy jednostkowe
- **Playwright** - testy E2E

### Wymagania

- Node.js 22+
- npm 10+

## Uruchomienie

```bash
npm install
ng serve
```

Aplikacja dostępna pod: http://localhost:4200

## Testy

### Jednostkowe (Jest)

```bash
# uruchom wszystkie testy
npm test

# tryb watch
npm run test:watch

# pokrycie kodu
npm run test:coverage
```

### E2E (Playwright)

```bash
# uruchom testy headless
npm run e2e

# tryb interaktywny z podglądem i debugowaniem
npm run e2e:ui

# uruchom konkretny plik
npx playwright test e2e/specs/home-page.spec.ts

# pokaż raport po testach
npx playwright show-report
```

## Architektura

core/ - modele, mapper, utils, serwisy API i WS, interceptory
features/home/ - facade, strona główna, komponenty prezentacyjne

```
src/app/
├── core/
│   ├── api/          ← serwisy HTTP
│   ├── ws/           ← WebSocket
│   ├── mappers/      ← DTO → ViewModel
│   ├── models/       ← interfejsy
│   └── utils/        ← funkcje pomocnicze
└── features/
    └── home/
        ├── home-facade.service.ts   ← stan i logika
        ├── home-page/               ← smart component
        └── components/              ← presentational components
            ├── holdings-table/
            ├── holdings-chart/
            └── add-holding-dialog/
```

### Wzorce architektoniczne

- **Facade Pattern** - `HomeFacadeService` orkiestruje HTTP i WebSocket
- **Presentation/Container split** - `HomePageComponent` to kontener, reszta to czyste komponenty
- **Mapper** - separacja kontraktu API od modelu widoku
- **Functional interceptor** - `apiBaseUrlInterceptor` wstrzykuje base URL

## Założenia biznesowe

**Wyliczanie wartości netto:**
Przyjęto, że wartość brutto zawiera VAT 23%.
Wzór: `priceNetto = priceGross / 1.23`, zaokrąglone do 2 miejsc po przecinku.
Przykład: brutto = 123 PLN → netto = 100.00 PLN

**WebSocket:**
Wiadomości traktowane jako pełna lub częściowa aktualizacja listy.
Rekordy scalane po `companyName`.
Wyliczanie wartości brutto.
Wzór: `priceGross = priceNetto * 1.23`, zaokrąglone do 2 miejsc po przecinku.

**Po zapisie:**
Wykonywany jest refetch z `get_data` dla spójności stanu.

## Dostępność (WCAG 2.2)

- Semantyczny HTML: `<main>`, `<header>`, `<section>`, `<h1>`–`<h2>`
- Tabela z `scope="col"` na nagłówkach kolumn
- Pola formularza z `<label>`, `aria-describedby` na błędach, `aria-invalid`
- Wykres z `role="img"` i `aria-label` (tekstowa alternatywa w tabeli)
- `aria-live="polite"` na komunikatach o pustej tabeli i wykresie
- Widoczny focus ring dla nawigacji klawiaturą
- Kontrast min. 4.5:1 dla tekstu (theme Aura)
- `prefers-reduced-motion` respektowany globalnie
- Przyciski z `aria-label` opisującym akcję

## Dokumentacja architektoniczna

Kluczowe decyzje techniczne są udokumentowane jako ADR w katalogu [`docs/adr/`](./docs/adr/).

| Nr                                                      | Tytuł                                | Status        | Data       |
| ------------------------------------------------------- | ------------------------------------ | ------------- | ---------- |
| [ADR-01](docs/adr/01-zarzadzanie-stanem-signals.md)     | Zarządzanie stanem - Angular Signals | Zaakceptowany | 2026-04-12 |
| [ADR-02](docs/adr/02-biblioteka-komponentow-primeng.md) | Biblioteka komponentów - PrimeNG     | Zaakceptowany | 2026-04-12 |
| [ADR-03](docs/adr/03-testy-jest-testing-library.md)     | Testy - Jest + Testing Library       | Zaakceptowany | 2026-04-12 |
| [ADR-04](docs/adr/04-testy-jest-testing-library.md)     | Testy E2E - Playwright               | Zaakceptowany | 2026-04-13 |

## Użycie AI

Projekt powstawał z pomocą narzędzi AI jako asystenta - generowane były
szkielety komponentów, szablony testów i style SCSS.
Logika biznesowa, architektura aplikacji oraz konfiguracja środowiska
zostały napisane samodzielnie. Każdy fragment kodu AI był weryfikowany,
rozumiany i dostosowywany przed włączeniem do projektu.
