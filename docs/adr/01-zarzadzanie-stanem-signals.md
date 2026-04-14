# ADR-01: Zarządzanie stanem - Angular Signals + wzorzec Facade

**Data:** 2026-04-12
**Status:** Zaakceptowany

## Kontekst

Aplikacja potrzebuje reaktywnego stanu: lista holdings aktualizowana
przez WebSocket, flagi loading/error/saving, dane wykresu.

## Rozważane opcje

| Opcja                | Zalety                                | Wady                               |
| -------------------- | ------------------------------------- | ---------------------------------- |
| **Signals + Facade** | Wbudowane w Angular, zero dependencji | Brak devtools                      |
| NgRx                 | Devtools, time-travel, duże zespoły   | Ogromny boilerplate dla małej apki |
| NgRx SignalStore     | Lżejszy NgRx                          | Nowe API, mniej materiałów         |

## Decyzja

Wybrano **Angular Signals** z wzorcem **Facade** (`HomeFacadeService`)
jako jedyną warstwą między komponentem a serwisami.

## Uzasadnienie

- Rozmiar projektu nie uzasadnia NgRx
- `computed()` zastępuje selektory, `effect()` zastępuje efekty
- Fasada izoluje komponenty od logiki biznesowej - łatwe testowanie przez mock

## Konsekwencje

✅ Zero dodatkowych zależności  
✅ Komponenty nie wiedzą skąd pochodzą dane  
⚠️ Brak devtools do inspekcji stanu  
⚠️ Przy rozroście projektu - rozważyć migrację na NgRx SignalStore
