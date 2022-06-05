import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private subscription: Subscription; 
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      })
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe((contactList: Contact[]) => {
      this.contacts = contactList; 
    })
  }
}
