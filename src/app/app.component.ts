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
  
  productCollection: Collection<string> = new Collection<string>(['banana', 'bread', 'milk']);
  numbersCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }
  
  isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
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