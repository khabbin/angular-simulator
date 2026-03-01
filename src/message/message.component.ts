import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { MessageStatus } from '../enums/MessageStatus';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messageStatus: typeof MessageStatus = MessageStatus;
  messageService: MessageService = inject(MessageService);
  
}
