import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  
  originalContact: Contact;
  groupContacts: Contact[] = [];
  contact: Contact;
  editMode: boolean = false;
  id: string; 
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id === undefined || this.id === null) {
        this.editMode = false;
        return
      }
      this.originalContact = this.contactService.getContact('id');
      if (this.originalContact === undefined || this.originalContact === null) {
        return
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact))
      if (this.groupContacts) {
        this.groupContacts = [...this.contact.group];
      }
    })
  }
  onSubmit(form: NgForm){
    const value= form.value;
    const newContact = new Contact(this.id, value.name , value.email, value.phone,value.imageUrl,this.groupContacts);
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact)
    }else{
      this.contactService.addContact(newContact)
    }
    this.router.navigateByUrl('/contacts')
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let index = 0; index < this.groupContacts.length; index++) {
      if (newContact.id === this.groupContacts[index].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }


  onRemoveItem(index: number){
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.invalidGroupContact = false;
  }
  onCancel(){
    this.router.navigateByUrl('/contacts')
  }
 
}
