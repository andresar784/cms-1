import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1,'Hello','This message 1','Bro Murphy'),
    new Message(2,'Response to the HELLO','Hello!','Bro Toms'),
    new Message(3,'Bye','Bye-bye message','Bro Murphy')
  ]
  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
