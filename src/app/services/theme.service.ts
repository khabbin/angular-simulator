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
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((theme: boolean) => {
      const element: HTMLElement = document.querySelector('html')!
      theme ? element.classList.add('p-dark') : element.classList.remove('p-dark')
    })
  );
  
  private presetSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LARA);
  preset$: Observable<Theme> = this.presetSubject.asObservable();
  presets: ITheme[] = [
    { name: 'Aura', preset: Aura, value: Theme.AURA },
    { name: 'Lara', preset: Lara, value: Theme.LARA },
    { name: 'Nora', preset: Nora, value: Theme.NORA }
  ];
  
  constructor() {
    const savedTheme: boolean = this.localStorageService.getItem<boolean>('theme') ?? false;
    this.isDarkModeSubject.next(savedTheme);
    const savedPresetLabel: string = localStorage.getItem('colorPresetLabel') ?? 'Aura';
    const presetObject: Theme = this.presets.find(p => p.name === savedPresetLabel)?.value || Theme.AURA;
    this.presetSubject.next(presetObject);
  }

  toggleTheme(theme: boolean): void {
    this.isDarkModeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }
  
  onPresetChange(presetValue: Theme): void {
    const preset: ITheme | undefined = this.presets.find((p: ITheme) => p.value === presetValue);
    if (preset) {
      this.localStorageService.setItem('colorPresetLabel', preset.name);
      this.presetSubject.next(preset.value);
      usePreset(preset.preset);
    }
  }
  
}
