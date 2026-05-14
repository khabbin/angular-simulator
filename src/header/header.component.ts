import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from '../interfaces/ILink';
import { ThemeService } from '../app/services/theme.service';
import { ToggleSwitchChangeEvent } from 'primeng/types/toggleswitch';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, IconDefinition } from "@fortawesome/angular-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe } from '@angular/common';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { ITheme } from '../interfaces/ITheme';
import { Observable } from 'rxjs';
import { Theme } from '../enums/Theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, FaIconComponent, ToggleSwitchModule, AsyncPipe, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  themeService: ThemeService = inject(ThemeService);
  theme$: Observable<boolean> = this.themeService.theme$;
  isDateView: boolean = true;
  clicksCount: number = 0;
  currentDateAndTime!: string;
  companyName: string = 'румтибет';
  
  links: ILink[] = [
    {
      title: 'Главная',
      path: '/'
    },
    {
      title: 'Пользователи',
      path: '/users'
    }
  ];

  constructor() {
    setInterval(() => this.currentDateAndTime = new Date().toLocaleString(), 1000);
  }
  
  reduceCounter(): void {
    this.clicksCount--;
  }
  
  increaseCounter(): void {
    this.clicksCount++;
  }
  
  toggleBlock(): void {
    this.isDateView = !this.isDateView;
  }
  
  toggleTheme(theme: ToggleSwitchChangeEvent): void {
    this.themeService.toggleTheme(theme.checked)
  }
  
  colorPresets: ITheme[] = this.themeService.colorPresets;
  colorPreset$: Observable<Theme> = this.themeService.colorPreset$;
  
  onColorPresetChange(event: SelectButtonChangeEvent): void {
    this.themeService.onColorPresetChange(event.value as Theme);
  }
  
}
