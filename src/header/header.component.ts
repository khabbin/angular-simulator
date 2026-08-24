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
  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
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
    },
    {
      title: 'Посты',
      path: '/posts'
    },
    {
      title: 'Login',
      path: '/login'
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
    this.themeService.toggleTheme(theme.checked);
  }
  
  presets: ITheme[] = this.themeService.presets;
  preset$: Observable<Theme> = this.themeService.preset$;
  
  onPresetChange(event: SelectButtonChangeEvent): void {
    this.themeService.onPresetChange(event.value as Theme);
  }
  
}
