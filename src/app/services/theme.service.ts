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
  
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private themeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public theme$: Observable<boolean> = this.themeSubject.asObservable().pipe(
    tap(theme => {
      const element = document.querySelector('html')!
      theme ? element.classList.add('p-dark') : element.classList.remove('p-dark')
    })
  );
  
  colorPresetSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LARA);
  colorPreset$: Observable<Theme> = this.colorPresetSubject.asObservable();
  colorPresets: ITheme[] = [
    { name: 'Aura', preset: Aura, value: Theme.AURA },
    { name: 'Lara', preset: Lara, value: Theme.LARA },
    { name: 'Nora', preset: Nora, value: Theme.NORA }
  ];
  
  constructor() {
    const savedTheme = this.localStorageService.getItem<boolean>('theme') ?? false;
    this.themeSubject.next(savedTheme);
    
    const savedPresetLabel: string = localStorage.getItem('colorPresetLabel') ?? 'Aura';
    const presetObject: Theme = this.colorPresets.find(p => p.name === savedPresetLabel)?.value || Theme.AURA;
    this.colorPresetSubject.next(presetObject);
  }

  toggleTheme(theme: boolean): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }
  
  onColorPresetChange(presetValue: Theme): void {
    const preset: ITheme | undefined = this.colorPresets.find(p => p.value === presetValue);
    if (preset) {
      localStorage.setItem('colorPresetLabel', preset.name);
      this.colorPresetSubject.next(preset.value);
      usePreset(preset.preset);
    }
  }
}
