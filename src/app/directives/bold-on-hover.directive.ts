import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {
  
  @HostBinding('style.fontWeight') weight: string = 'normal';
  
  @HostListener('mouseenter')
    onMouseEnter(): void {
      this.weight = 'bold';
    }
  
  @HostListener('mouseleave')
    onMouseLeave(): void {
      this.weight = 'normal';
    }
  
}
