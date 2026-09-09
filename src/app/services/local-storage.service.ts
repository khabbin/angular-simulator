import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setItem<T>(key: string, value: T): void {
    const stringValue: string =
      typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getItem<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return (item as T) || null;
    }
  }

  clear(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
