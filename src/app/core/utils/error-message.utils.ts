import { HttpErrorResponse } from '@angular/common/http';

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Nieprawidłowe dane żądania. Wszystkie pola muszą być uzupełnione',
  401: 'Brak autoryzacji. Zaloguj się ponownie.',
  403: 'Brak uprawnień do wykonania tej operacji.',
  404: 'Nie znaleziono zasobu.',
  429: 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
  500: 'Błąd serwera. Spróbuj ponownie później.',
  503: 'Serwis tymczasowo niedostępny. Spróbuj ponownie później.',
};

export function getErrorMessage(error: unknown): string {
  if (!(error instanceof HttpErrorResponse)) {
    return 'Wystąpił nieoczekiwany błąd.';
  }

  const serverMessage = error.error?.message;
  if (serverMessage && typeof serverMessage === 'string') {
    return serverMessage;
  }

  return HTTP_ERROR_MESSAGES[error.status] ?? 'Wystąpił nieoczekiwany błąd.';
}
