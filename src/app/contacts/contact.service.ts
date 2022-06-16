import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ContactsComponent } from './contacts.component';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact []>();  
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact []>();
  contacts: Contact[] = [];
  maxContactId: number; 
  constructor(private http:HttpClient) {
    
  }

  getContacts(): Contact[] {
    this.http.get('https://wdd430cms-64065-default-rtdb.firebaseio.com/contacts.json')
    .subscribe({
      next: (contacts: Contact[])=> {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error: (e) => console.log(e.message),
    });
    return null;
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
    this.storeContact();
    // this.contactListChangedEvent.next(contactListClone);
    // this.contactChangedEvent.emit(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (let con of this.contacts) {
      let currentId = +con.id;
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
    this.storeContact();
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
    this.storeContact();
  }
  storeContact(){
    let contactToStore = JSON.stringify(this.contacts);
    this.http.put('https://wdd430cms-64065-default-rtdb.firebaseio.com/contacts.json' , contactToStore,
    {
      headers: new HttpHeaders({'Content-type': 'application-json'})
    }).subscribe(()=>{
      this.contactListChangedEvent.next(this.contacts);
    })
  }

}


