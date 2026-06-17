import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { Theme } from '../enums/Theme';
import { routes } from './app.routes';
import { Preset } from '@primeuix/themes/types';
import { loggingInterceptor } from './interceptors/http-logging.interceptor';
import { errorInterceptor } from './interceptors/http-error.interceptor';

const getPreset = (): Preset => {
  const savedTheme: string = (localStorage.getItem('presetLabel')) || Theme.AURA;
  switch(savedTheme) {
    case Theme.NORA:
      return Nora;
      
    case Theme.LARA:
      return Lara;
      
    default:
      return Aura;
  }
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(
      withInterceptors([loggingInterceptor, errorInterceptor])
    ),
    providePrimeNG({
      theme: {
          preset: getPreset(),
          options: {
            darkModeSelector: '.p-dark'
          }
      }
    })
  ]
}