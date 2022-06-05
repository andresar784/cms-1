import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact []>();  
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact []>();
  contacts: Contact[] = [];
  maxContactId: number; 
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId(); 
  }
  getContacts() {
    return this.contacts.slice();
  }
  getContact(id: string) {
    return this.contacts.find((contact) => contact.id == id)
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.contacts) {
      let currentId = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone)
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact  || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

}


