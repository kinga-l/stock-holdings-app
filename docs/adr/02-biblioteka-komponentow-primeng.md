# ADR-02: Wybór biblioteki komponentów - PrimeNG

**Data:** 2026-04-12  
**Status:** Zaakceptowany  
**Autorzy:** Kinga Pawelec

---

## Kontekst

Aplikacja stock-holdings wymaga gotowych komponentów UI: tabeli, okna dialogowego,
formularza z walidacją, wykresu. Projekt musi być dostarczony sprawnie,
bez budowania komponentów od zera.

## Rozważane opcje

| Opcja                | Zalety                                                    | Wady                                                  |
| -------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| **PrimeNG**          | Bogaty zestaw komponentów, Angular-native, aktywny rozwój | Duży bundle, opinionated styling                      |
| **Angular Material** | Oficjalny Google, stabilny, lekki                         | Mniej komponentów (brak p-inputNumber, dynamicDialog) |

## Decyzja

Wybrano **PrimeNG v20** zsynchronizowany wersją z Angular 20.

## Uzasadnienie

- PrimeNG od v20 przeszedł na **semantic versioning** - wersja = wersja Angular [web:93]
- v20 zaprojektowany jako drop-in replacement v19 - brak breaking changes [web:82]
- PrimeTek zapowiedział PrimeNGX jako następcę, PrimeNG v20 pozostaje w aktywnym wsparciu (STS) [web:80]

## Konsekwencje

✅ Wersja zsynchronizowana z Angular - koniec problemów z peer dependencies  
✅ Brak breaking changes względem v19 - migracja bezbolesna  
⚠️ PrimeNG przejdzie w LTS gdy wyjdzie v21 - do monitorowania [web:83]  
⚠️ DynamicDialog miał bug w Angular 20 - naprawiony w aktualnym release [web:81]  
⚠️ Przyszłość biblioteki to PrimeNGX - warto śledzić roadmapę [web:80]
