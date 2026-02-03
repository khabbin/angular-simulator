import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IService } from '../interfaces/IService';
import { IWrapperInput } from '../interfaces/IWrapperInput';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  isLoading: boolean = true;
  
  clicksCount: number = 0;
  liveInputValue: string = '';
  currentTime: string = new Date().toLocaleString();
  isDateView: boolean = true;
  
  selectedPerson: string = '';
  selectedTourDate: string = '' ;
  selectedTourLocation: string = '';
  selectedServiceId: number = 0;
  
  companyName: string = 'румтибет';
  
  private shieldIcon: string = 'images/shield-icon.svg';
  private guideIcon: string = 'images/guide-icon.svg';
  private priceTagIcon: string = 'images/price-tag-icon.svg';
  
  productCollection: Collection<string> = new Collection<string>(['banana', 'bread', 'milk']);
  numbersCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  
  cities: IWrapperInput[]= [
    { value: 'moscow', label: 'Москва' },
    { value: 'petersburg', label: 'Санкт-Петербург' },
    { value: 'samara', label: 'Самара' },
    { value: 'kazan', label: 'Казань' },
    { value: 'ufa', label: 'Уфа' }
  ];
  
  persons: IWrapperInput[] = [
    { value: 'jorno', label:'Джорно' },
    { value: 'jotaro', label:'Джотаро' },
    { value: 'josef', label: 'Джозеф'},
    { value: 'josuke', label: 'Джоске' },
    { value: 'jonatan', label: 'Джонатан'},
    { value: 'jolin', label: 'Джолин' }
  ];
  
  items: IService[] = [
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
  
  constructor() {
    setInterval(() => this.currentTime = new Date().toLocaleString(), 1000);
    setInterval(()=> this.isLoading = false, 2000);
  }
  
  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }
  
  private saveLastVisitDate(): void {
    const now: Date = new Date();
    localStorage.setItem('last-visit', now.toISOString());
  }
  
  private saveVisitCount(): void {
    const currentCount: string = localStorage.getItem('visit-count') || '0';
    const newCount: number = parseInt(currentCount) + 1;
    localStorage.setItem('visit-count', newCount.toString());
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
  
  switchBlock(): void {
    this.isDateView  = !this.isDateView;
  }
  
}