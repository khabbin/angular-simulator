import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { ColorPreset } from '../enums/ColorPreset';
import { routes } from './app.routes';

const getColorPreset = () => {
  const savedTheme: string = JSON.parse(localStorage.getItem('colorPresetLabel') ?? JSON.stringify(ColorPreset.AURA));
  switch(savedTheme) {
    case ColorPreset.NORA:
      return Nora
    case ColorPreset.LARA:
      return Lara
    default:
      return Aura
  }
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(),
    providePrimeNG({
            theme: {
                preset: getColorPreset(),
                options: {
                  darkModeSelector: '.p-dark'
                }
            }
            
        })
  ]
  
};
