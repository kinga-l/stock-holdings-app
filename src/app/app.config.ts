import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { Chart, ArcElement, PieController, Tooltip, Legend, CategoryScale } from 'chart.js';
import { routes } from './app.routes';
import { apiBaseUrlInterceptor } from './core/interceptors/api-base-url-interceptor';

Chart.register(ArcElement, PieController, Tooltip, Legend, CategoryScale);
registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),
    // provideAnimations() jest deprecated od Angular 20.2 (docelowo usunięte w v23).
    // Pozostawione celowo - PrimeNG 20 wymaga legacy animations API.
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' },
      },
    }),
    { provide: LOCALE_ID, useValue: 'pl' },
    MessageService,
  ],
};
