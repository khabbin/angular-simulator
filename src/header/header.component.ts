import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from '../interfaces/ILink';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
}
