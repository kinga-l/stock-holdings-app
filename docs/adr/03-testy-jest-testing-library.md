# ADR-03: Testy - Jest + Angular Testing Library

**Data:** 2026-04-12
**Status:** Zaakceptowany

## Kontekst

Angular CLI generuje Karma + Jasmine. Potrzebne szybsze testy,
lepsza integracja z VS Code i podejście user-centric.

## Rozważane opcje

| Opcja           | Zalety                                         | Wady                                       |
| --------------- | ---------------------------------------------- | ------------------------------------------ |
| **Jest + ATL**  | Szybki, snapshot testing, user-centric queries | Konfiguracja ESM (transformIgnorePatterns) |
| Karma + Jasmine | Domyślny w Angular CLI, zero konfiguracji      | Wolny, wymaga przeglądarki                 |

## Decyzja

Wybrano **Jest** z **jest-preset-angular** oraz
**@testing-library/angular** do testów komponentów.

## Uzasadnienie

- Testy działają bez przeglądarki - szybsze CI
- ATL wymusza testowanie przez DOM (getByRole, getByLabel) zamiast internals
- `screen.debug()` i queries czytelniejsze niż Jasmine matchers

## Konsekwencje

✅ ~3x szybsze wykonanie niż Karma  
✅ Testy odporne na refactoring internals komponentów  
⚠️ PrimeNG, @primeuix, @testing-library wymagają `transformIgnorePatterns`  
⚠️ p-inputNumber wymaga setValue() zamiast userEvent w testach jednostkowych
