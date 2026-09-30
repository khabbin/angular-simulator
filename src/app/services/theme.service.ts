import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';
import { ITheme } from '../../interfaces/ITheme';
import { Theme } from '../../enums/Theme';
import { APP_CONFIG } from '../app-configuration.token';
import { IAppConfig } from '../IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private config: IAppConfig = inject(APP_CONFIG);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  presets: ITheme[] = [
    { name: 'Aura', preset: Aura, value: Theme.AURA },
    { name: 'Lara', preset: Lara, value: Theme.LARA },
    { name: 'Nora', preset: Nora, value: Theme.NORA },
  ];

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitialDarkMode());

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((theme: boolean) => {
      const element: HTMLElement = document.querySelector('html')!;
      element.classList.toggle('p-dark', theme);
    })
  );

  private presetSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.getInitialPreset()
  );

  preset$: Observable<Theme> = this.presetSubject.asObservable();

  toggleTheme(theme: boolean): void {
    if (!this.config.enableTheming) return;
    this.isDarkModeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }

  onPresetChange(presetValue: Theme): void {
    if (!this.config.enableTheming) return;
    const preset: ITheme | undefined = this.presets.find(
      (p: ITheme) => p.value === presetValue
    );
    if (preset) {
      this.localStorageService.setItem('presetLabel', preset.name);
      this.presetSubject.next(preset.value);
      usePreset(preset.preset);
    }
  }

  private getInitialDarkMode(): boolean {
    return this.localStorageService.getItem<boolean>('theme') ?? false;
  }

  private getInitialPreset(): Theme {
    const savedLabel = this.localStorageService.getItem<string>('presetLabel');
    const found = this.presets.find((p: ITheme) => p.name === savedLabel);
    return found ? found.value : Theme.AURA;
  }

}
