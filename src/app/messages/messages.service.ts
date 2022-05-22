import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message [] = [];

  constructor() { 
     this.messages = MOCKMESSAGES; 
     
  }
  getMessages(){
    return this.messages.slice();
  }
  getMessage(id: string){
    return this.messages.find((message) => message.id == id)
  }
  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
