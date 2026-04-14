# ADR-04: Testy E2E - Playwright

**Data:** 2026-04-13
**Status:** Zaakceptowany

---

## Kontekst

Projekt posiada testy jednostkowe (Jest + ATL), ale brakuje testów
weryfikujących działanie aplikacji jako całości - przepływ od otwarcia
strony przez interakcję z formularzem do aktualizacji tabeli i wykresu.

## Rozważane opcje

| Opcja          | Zalety                                                           | Wady                                              |
| -------------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| **Playwright** | Rekomendowany przez Angular team, szybki, parallel, Trace Viewer | Mniejsza społeczność niż Cypress                  |
| Cypress        | Bardzo popularne, dużo materiałów, Dashboard UI                  | Wolniejszy, płatny dashboard, problemy z parallel |

## Decyzja

Wybrano **Playwright** z wzorcem **Page Object Model (POM)**.

## Uzasadnienie

- Rekomendowany przez Angular team jako domyślne narzędzie e2e [angular.dev/tools/cli/end-to-end]
- `webServer` w konfiguracji automatycznie uruchamia `ng serve` przed testami
- Trace Viewer i `--ui` mode znacznie ułatwiają debugowanie
- Page Object Model izoluje selektory od logiki testów - testy odporne na zmiany w DOM
- Lepsza obsługa równoległego wykonywania testów niż Cypress

## Struktura

e2e/
├── pages/
│ └── home.page.ts ← selektory i akcje zgrupowane per strona
└── specs/
├── home-page.spec.ts ← widoczność tabeli, wykresu, tytułu
└── add-holding.spec.ts ← przepływ dodawania firmy

## Konfiguracja

```typescript
// playwright.config.ts
webServer: {
  command: 'ng serve',
  url: 'http://localhost:4200',
  reuseExistingServer: !process.env['CI'],
  timeout: 120000,
}
```

## Pokryte scenariusze

- Otwarcie dialogu "Dodaj" po kliknięciu przycisku
- Walidacja formularza - brak możliwości zapisu pustych danych
- Zamknięcie dialogu przyciskiem "Anuluj"

## Konsekwencje

✅ Pełny przepływ użytkownika pokryty testami automatycznymi
✅ `webServer` eliminuje potrzebę ręcznego uruchamiania aplikacji przed testami
✅ POM - zmiana selektora w jednym miejscu, nie w każdym teście
⚠️ Testy E2E wymagają działającego backendu lub mockowania API
⚠️ Długi `timeout` (`120000ms`) na `ng serve` może spowolnić CI
⚠️ Testy wrażliwe na dane - przy dynamicznych danych z WS mogą być niestabilne
