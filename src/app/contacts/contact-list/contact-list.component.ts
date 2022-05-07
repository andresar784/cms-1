import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
    new Contact(2, 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', [])
  ]

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(contact: Contact){
    // console.log('worked');
    this.selectedContactEvent.emit(contact);
  }

}
