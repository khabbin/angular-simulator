export class Collection<T> {
  
  private items: T[] = [];
  
  constructor(item:T[]) {
    this.items = item;
  }
  
  getAll(): T[] {
    return this.items;
  }
  
  getByindex(index: number): T | undefined {
    return this.items[index];
  }
  
  clear(): void {
    this.items = [];
  }
  
  removeByIndex(index: number): void {
    this.items.splice(index, 1);
  }
  
  replaceByIndex(index: number, newItem: T): void {
    this.items[index] = newItem;
  }
  
}