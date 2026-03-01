import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { MessageStatus } from '../enums/MessageStatus';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  messageStatus: typeof MessageStatus = MessageStatus;
  messageService: MessageService = inject(MessageService);
}
