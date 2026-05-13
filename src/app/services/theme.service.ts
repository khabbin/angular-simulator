import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';
import { ITheme } from '../../interfaces/ITheme';
import { ColorPreset } from '../../enums/ColorPreset';

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
  
  colorPresetSubject: BehaviorSubject<ColorPreset> = new BehaviorSubject<ColorPreset>(ColorPreset.LARA);
  colorPreset$: Observable<ColorPreset> = this.colorPresetSubject.asObservable();
  colorPresets: ITheme[] = [
    { name: 'Aura', preset: Aura, value: ColorPreset.AURA },
    { name: 'Lara', preset: Lara, value: ColorPreset.LARA },
    { name: 'Nora', preset: Nora, value: ColorPreset.NORA }
  ];
  
  constructor() {
    const savedTheme = this.localStorageService.getItem<boolean>('theme') ?? false;
    this.themeSubject.next(savedTheme);
    
    const savedPresetLabel: string = this.localStorageService.getItem<string>('colorPresetLabel') ?? 'Lara';
    const presetObject: ColorPreset = this.colorPresets.find(p => p.name === savedPresetLabel)?.value || ColorPreset.LARA;
    this.colorPresetSubject.next(presetObject);
  }

  toggleTheme(theme: boolean): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }
  
  onColorPresetChange(presetValue: ColorPreset): void {
    const preset: ITheme | undefined = this.colorPresets.find(p => p.value === presetValue);
    if (preset) {
      this.localStorageService.setItem('colorPresetLabel', preset.name);
      this.colorPresetSubject.next(preset.value);
      usePreset(preset.preset);
    }
  }
}
