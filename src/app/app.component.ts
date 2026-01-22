import { Component } from '@angular/core';
import './training';
import { Colors } from '../enums/Colors';
import { Collection } from './collection';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  constructor() {
    this.setLastVisitDate();
    this.trackVisit();
  }
  
  isMainColor(color: Colors): boolean {
    return color === Colors.RED || color === Colors.GREEN ||  color === Colors.BLUE;
  }
  
  setLastVisitDate(): void {
    const now = new Date();
    localStorage.setItem('lastVisit', now.toISOString());
  }
  
  trackVisit(): void {
    const currentCount: string = localStorage.getItem('visitCount') || '0';
    const newCount: number = parseInt(currentCount) + 1;
    localStorage.setItem('visitCount', newCount.toString());
  }
}

const products: string[] = ['banana', 'bread', 'milk'];
const numbers: number[] = [1, 2, 3, 4, 5];

const productCollection: Collection<string> = new Collection<string>(products);
const numbersCollection: Collection<number> = new Collection<number>(numbers);
