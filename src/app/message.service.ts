import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageStatus } from '../enums/MessageStatus';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: IMessage[] = [];
  
  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((msg: IMessage) => msg !== messageToRemove);
  }
  
  showInfo(message: string) {
    this.addMessage(MessageStatus.INFO, message)
  }
  
  showError(message: string) {
    this.addMessage(MessageStatus.ERROR, message)
  }
  
  showWarn(message: string) {
    this.addMessage(MessageStatus.WARN, message)
  }
  
  showSucces(message: string) {
    this.addMessage(MessageStatus.SUCCESS, message)
  }
  
  private addMessage(type: MessageStatus, message: string): void {
    const currentObject: IMessage = { type, message };
    this.messages = [currentObject, ...this.messages];
  
    setTimeout(() => {
      this.closeMessage(currentObject);
    }, 3000);
  }
  
}