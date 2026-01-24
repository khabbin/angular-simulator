import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет'
  products: string[] = ['banana', 'bread', 'milk'];
  numbers: number[] = [1, 2, 3, 4, 5];
  productCollection: Collection<string> = new Collection<string>(this.products);
  numbersCollection: Collection<number> = new Collection<number>(this.numbers);
  mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }
  
  isMainColor(color: Color): boolean {
    return this.mainColors.includes(color);
  }
  
  saveLastVisitDate(): void {
    const now: Date = new Date();
    localStorage.setItem('last-visit', now.toISOString());
  }
  
  saveVisitCount(): void {
    const currentCount: string = localStorage.getItem('visit-count') || '0';
    const newCount: number = parseInt(currentCount) + 1;
    localStorage.setItem('visit-count', newCount.toString());
  }
  
}