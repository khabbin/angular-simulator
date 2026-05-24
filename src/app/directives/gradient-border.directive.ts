import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientBorder } from '../../interfaces/IGradientBorder';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective {
  
  @Input('appGradientBorder') config: IGradientBorder = {};
  
  private timeoutId!: number;
    
  @HostBinding('class.gradient-border-active') isActive: boolean = false;
  
  @HostBinding('style.--gradient-colors')
    get colors(): string {
      return this.config.colors?.join(', ') || 'red, black';
    }
  
  @HostBinding('style.--border-thickness')
    get thickness(): string {
      return this.config.thickness || '2px';
    }
  
  @HostListener('mouseenter')
    onMouseEnter(): void {
      this.timeoutId = setTimeout(() => {
        this.isActive = true;
      }, this.config.delay || 1000);
    }
  
  @HostListener('mouseleave')
    onMouseLeave(): void {
      clearTimeout(this.timeoutId);
      this.isActive = false;
    }
  
}
