import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientBorder } from '../../interfaces/IGradientBorder';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective {
  
  @Input('appGradientBorder') config: IGradientBorder = {
    colors: ['red', 'black'],
    thickness: '2px',
    delay: 1000,
  };

  private timeoutId!: number;

  @HostBinding('class.gradient-border-active') isActive = false;

  @HostBinding('style.--gradient-colors')
  get colors(): string {
    return this.config.colors!.join(', ');
  }

  @HostBinding('style.--border-thickness')
  get thickness(): string {
    return this.config.thickness!;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.timeoutId = setTimeout(() => {
      this.isActive = true;
    }, this.config.delay!);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    clearTimeout(this.timeoutId);
    this.isActive = false;
  }

}
