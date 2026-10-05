import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from '../interfaces/ILink';
import { ThemeService } from '../app/services/theme.service';
import { ToggleSwitchChangeEvent } from 'primeng/types/toggleswitch';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  SelectButtonChangeEvent,
  SelectButtonModule,
} from 'primeng/selectbutton';
import { ITheme } from '../interfaces/ITheme';
import { Observable } from 'rxjs';
import { Theme } from '../enums/Theme';
import { IAppConfig } from '../app/IAppConfig';
import { APP_CONFIG } from '../app/app-configuration.token';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    FaIconComponent,
    ToggleSwitchModule,
    AsyncPipe,
    SelectButtonModule,
    DatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  private config: IAppConfig = inject(APP_CONFIG);
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  themeService: ThemeService = inject(ThemeService);
  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  isDateView = true;
  clicksCount = 0;
  currentDateAndTime: Date = new Date(); 

  links: ILink[] = [
    {
      title: 'Главная',
      path: '/',
    },
    {
      title: 'Пользователи',
      path: '/users',
    },
    {
      title: 'Посты',
      path: '/posts',
    },
    {
      title: 'Login',
      path: '/login',
    },
  ];

  constructor() {
    setInterval(
      () => (this.currentDateAndTime = new Date()),
      1000
    );
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
