import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageStatus } from '../../enums/MessageStatus';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  
  closeMessage(messageToRemove: IMessage): void {
    const messageList: IMessage[] = this.messagesSubject.getValue();
    this.messagesSubject.next(messageList.filter(msg => msg !== messageToRemove));
  }
  
  showInfo(message: string): void {
    this.addMessage(MessageStatus.INFO, message);
  }
  
  showError(message: string): void {
    this.addMessage(MessageStatus.ERROR, message);
  }
  
  showWarn(message: string): void {
    this.addMessage(MessageStatus.WARN, message);
  }
  
  showSuccess(message: string): void {
    this.addMessage(MessageStatus.SUCCESS, message);
  }
  
  private addMessage(type: MessageStatus, text: string): void {
    const newMessage: IMessage = { type, text };
    const messageList: IMessage[] = this.messagesSubject.getValue();
    this.messagesSubject.next([newMessage, ...messageList]);
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 3000);
  }
  
}