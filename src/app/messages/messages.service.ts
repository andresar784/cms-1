import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message [] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {    
  }

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.messages) {
      let currentId = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  
  getMessages(): Message[] {
    this.http.get('http://localhost:3000/messages/')
    .subscribe({
      next: (messages: any)=> {
        this.messages = messages.messsages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (e) => console.log(e.message),
    });
    return null;
  }

  getMessage(id: string){
    return this.messages.find((message) => message.id == id)
  }

  // addMessage(message: Message){
  //   this.messages.push(message);
  //    this.messageChangedEvent.emit(this.messages.slice());
  //   this.addMessage1(this.messages);
  // }

  // storeMessages(){
  //   let messageToStore = JSON.stringify(this.messages);
  //   this.http.put('http://localhost:3000/messages/', messageToStore,
  //   {
  //     headers: new HttpHeaders({'Content-Type': 'application-json'})
  //   }).subscribe(() => {
  //     this.messageChangedEvent.next(this.messages)
  //   })
  // }
  addMessage(message: Message) {
    if (!message) {
      return;
    }
    // make sure id of the new Document is empty
    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ mesages: string, message: Message }>('http://localhost:3000/messages/',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message
          this.messages.push(responseData.message);
          // this.sortAndSend();
        }
      );
  }
}
