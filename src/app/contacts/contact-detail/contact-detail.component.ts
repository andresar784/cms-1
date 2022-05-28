import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact;
  contacts: Contact[] = [];
  id: string;

  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) { }
  
  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=> {
        this.id = params['id'],
        this.contact = this.contactService.getContact(this.id);
      })
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('contacts')
  }

}
