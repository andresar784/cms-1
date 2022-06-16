import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let newArray: Contact[] = [];
    if (term && term.length > 0) {
      newArray = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (newArray.length < 1) {
      return contacts;
    }
    return newArray;
  }
}