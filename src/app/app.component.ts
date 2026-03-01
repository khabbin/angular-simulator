import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { MessageStatus } from '../enums/MessageStatus';
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, FooterComponent, HeaderComponent, RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  messageService: MessageService = inject(MessageService);
  messageStatus: typeof MessageStatus = MessageStatus;
  isLoading: boolean = true;
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  constructor() {
    setInterval(() => this.isLoading = false, 2000);
  }
  
  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }
  
  private saveLastVisitDate(): void {
    const now: Date = new Date();
    this.localStorageService.setItem('last-visit', now.toISOString());
  }
  
  private saveVisitCount(): void {
    const currentCount: string = this.localStorageService.getItem('visit-count') || '0';
    const newCount: number = parseInt(currentCount) + 1;
    this.localStorageService.setItem('visit-count', newCount.toString());
  }
  
}