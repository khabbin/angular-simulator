import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageStatus } from '../enums/MessageStatus';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: IMessage[] = [];

  addMessage(type: MessageStatus, message: string): void {
    const currentObject: IMessage = { type, message };
    this.messages = [currentObject, ...this.messages];

    setTimeout(() => {
      this.closeMessage(currentObject);
    }, 5000);
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((msg: IMessage) => msg !== messageToRemove);
  }
}