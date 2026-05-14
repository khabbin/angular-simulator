import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(key: string, value: T): void {

    const q = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, q);
  }
  
  getItem<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  clear(): void {
    localStorage.clear();
  }
  
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}