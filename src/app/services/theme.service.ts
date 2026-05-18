import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';
import { ITheme } from '../../interfaces/ITheme';
import { Theme } from '../../enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  presets: ITheme[] = [
    { name: 'Aura', preset: Aura, value: Theme.AURA },
    { name: 'Lara', preset: Lara, value: Theme.LARA },
    { name: 'Nora', preset: Nora, value: Theme.NORA }
  ];
  
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitialDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((theme: boolean) => {
      const element: HTMLElement = document.querySelector('html')!
      theme ? element.classList.add('p-dark') : element.classList.remove('p-dark')
    })
  );
  
  private presetSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.getInitialPreset());
  preset$: Observable<Theme> = this.presetSubject.asObservable();
  
  toggleTheme(theme: boolean): void {
    this.isDarkModeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }
  
  onPresetChange(presetValue: Theme): void {
    const preset: ITheme | undefined = this.presets.find((p: ITheme) => p.value === presetValue);
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
    const found = this.presets.find(p => p.name === savedLabel);
    return found ? found.value : Theme.AURA;
  }
  
}
