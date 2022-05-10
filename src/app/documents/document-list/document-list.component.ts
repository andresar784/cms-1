import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output()  selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'WDD 430 - Web fullstack development', 'Description of the WDD 430 class', 'https://byui.instructure.com/courses/85726/assignments/syllabus', ''),
    new Document(2, 'WDD 360 - The fullstack development class. ','The old class','https://content.byui.edu/file/fb4c2d20-04c3-463d-93f6-725064a8b15d/4/fdmat108syllabus.html', ''),
    new Document(3, 'MATH 100B','Beggining Algebra','https://content.byui.edu/file/fb4c2d20-04c3-463d-93f6-725064a8b15d/4/fdmat108syllabus.html', ''), 
    new Document(4, 'Math108','Maths','https://content.byui.edu/file/fb4c2d20-04c3-463d-93f6-725064a8b15d/4/fdmat108syllabus.html', '')  
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document); 
  }

}
