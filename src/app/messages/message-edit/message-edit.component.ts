import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject')  subjectInputRef!: ElementRef;
  @ViewChild('msgText')  messageInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '2';

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }
  onSendMessage(){
    const subject = this.subjectInputRef.nativeElement.value; 
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(null,subject, message, this.currentSender);
    // this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);

  }
  onClear(){
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
