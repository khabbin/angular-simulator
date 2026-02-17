import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { MessageStatus } from '../enums/MessageStatus';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IService } from '../interfaces/IService';
import { IOption } from '../interfaces/IOption';
import { ITourDirection } from '../interfaces/ITourDirection';
import { IBlogPost } from '../interfaces/IBlogPost';
import { NgTemplateOutlet } from '@angular/common';
import { SystemMessageService } from '../app/system-message.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  systemMessageService: SystemMessageService = inject(SystemMessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  messageStatus: typeof MessageStatus = MessageStatus;
  
  isLoading: boolean = true;

  clicksCount: number = 0;
  liveInputValue!: string;
  currentDateAndTime!: string;
  isDateView: boolean = true;
  
  selectedPerson!: string;
  selectedTourDate!: string;
  selectedTourLocation!: string;
  selectedServiceId!: number;
  
  companyName: string = 'румтибет';
  
  readonly shieldIcon: string = 'images/shield-icon.svg';
  readonly guideIcon: string = 'images/guide-icon.svg';
  readonly priceTagIcon: string = 'images/price-tag-icon.svg';
  
  productCollection: Collection<string> = new Collection<string>(['banana', 'bread', 'milk']);
  numbersCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  
  cities: IOption<string>[] = [
    { value: 'moscow', label: 'Москва' },
    { value: 'petersburg', label: 'Санкт-Петербург' },
    { value: 'samara', label: 'Самара' },
    { value: 'kazan', label: 'Казань' },
    { value: 'ufa', label: 'Уфа' }
  ];
  
  persons: IOption<string>[] = [
    { value: 'jorno', label: 'Джорно' },
    { value: 'jotaro', label: 'Джотаро' },
    { value: 'josef', label: 'Джозеф' },
    { value: 'josuke', label: 'Джоске' },
    { value: 'jonatan', label: 'Джонатан' },
    { value: 'jolin', label: 'Джолин' }
  ];
  
  offers: IService[] = [
    {
      id: 1,
      icon: this.guideIcon,
      bgColor: '#E5EEEB',
      name: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: this.shieldIcon,
      bgColor: '#E3E6EE',
      name: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: this.priceTagIcon,
      bgColor: '#F3F1E1',
      name: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ];
  
  tours: ITourDirection[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      image: 'italy-dolomites-lake-braies'
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: 500,
      rating: 4.5,
      image: 'night-sky-mountains-milky-way'
    },
    {
      id: 3,
      title: 'Йога в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5,
      image: 'yoga-mountain-sunrise-balance'
    },
  ];
  
  blogPosts: IBlogPost[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      information: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: 'italy-manarola-cinque-terre'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      information: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      image: 'airplane-wing-sunset'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      information: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      image: 'solo-traveler-narrow-street'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      information: 'Для современного мира базовый.',
      date: '01/04/2023',
      image: 'india-taj-mahal-agra'
    }
  ]
  
  constructor() {
    setInterval(() => this.currentDateAndTime = new Date().toLocaleString(), 1000);
    setInterval(() => this.isLoading = false, 2000);
  }
  
  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }
  
  private saveLastVisitDate(): void {
    const now: Date = new Date();
    this.localStorageService.setItem('last-visit', now.toISOString());
  }
  
  private saveVisitCount(): void {
    const currentCount: string = this.localStorageService.getItem('visit-count') || '0';
    const newCount: number = parseInt(currentCount) + 1;
    this.localStorageService.setItem('visit-count', newCount.toString());
  }
  
  selectOffer(itemId: number): void {
    this.selectedServiceId = itemId;
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