import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageStatus } from '../enums/MessageStatus';

@Injectable({
  providedIn: 'root',
})
export class SystemMessageService {
  
  messages: IMessage[] = [];

  addMessage(type: MessageStatus, message: string): void {
    const currentObject: IMessage = { type, message };
    this.messages = [currentObject, ...this.messages];

    setTimeout(() => {
      this.closeMessage(currentObject);
    }, 3000)
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((msg): boolean => msg !== messageToRemove);
  }
}
