import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'declension',
})
export class DeclensionPipe implements PipeTransform {

  transform(value: number, one: string, few: string, many: string): string {
    const mod10: number = value % 10;
    const mod100: number = value % 100;
    
    if (mod100 >= 11 && mod100 <= 14) {
      return `${value} ${many}`;
    }
    if (mod10 === 1) {
      return `${value} ${one}`;
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return `${value} ${few}`;
    }
    return `${value} ${many}`;
  }
  
}
