import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  
  transform(phone: string | number, format: 'compact' | 'international' | 'national' | 'masked' = 'international'): string {
    
    let raw: string = phone.toString().split('x')[0].replace(/\D/g, '');
    if (raw.length < 11) {
      raw = '1' + raw;
    }
    
    const p4: string = raw.slice(-2);
    const p3: string = raw.slice(-4, -2);
    const p2: string = raw.slice(-7, -4);
    const p1: string = raw.slice(-10, -7);
    const countryCode: string = raw.slice(0, -10);
    
    switch (format) {
      case 'compact':
        return `+${raw}`;
      case 'international':
        return `+${countryCode} ${p1} ${p2} ${p3} ${p4}`;
      case 'national':
        return `${p1} ${p2} ${p3} ${p4}`;
      case 'masked':
        return `+${countryCode} ${p1} *** ** ${p4}`;
      default:
        return raw;
    }
  }

}
