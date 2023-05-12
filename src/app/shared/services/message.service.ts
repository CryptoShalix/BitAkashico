import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MessageType } from '../components/message-manager/message-manager.component';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string, type: MessageType = MessageType.NORMAL) {
    this.subject.next({ text: message, type });
  }

  clearMessage() {
    this.subject.next('');
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}