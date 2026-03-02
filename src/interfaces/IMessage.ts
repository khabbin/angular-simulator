import { MessageStatus } from "../enums/MessageStatus"

export interface IMessage {
  type: MessageStatus;
  text: string;
}