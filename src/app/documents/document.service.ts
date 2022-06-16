import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
  } 

  getDocuments(): Document[] {
    this.http.get('https://wdd430cms-64065-default-rtdb.firebaseio.com/documents.json')
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (e) => console.log(e.message),
      });
      return null;
  }
  
  getDocument(id: string) {
    return this.documents.find((document) => document.id == id)
  }


  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    let documentListClone = this.documents.slice();
    this.storeDocument();
    // this.documentChangedEvent.emit(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.documents) {
      let currentId = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.storeDocument();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument  || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocument();
  }
  storeDocument() {
    let documentsToStore = JSON.stringify(this.documents);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application-json'
    // })
    this.http.put('https://wdd430cms-64065-default-rtdb.firebaseio.com/documents.json', documentsToStore,
    {
       headers: new HttpHeaders({'Content-Type': 'application-json'})
    }).subscribe(()=>{
        this.documentListChangedEvent.next(this.documents);
      })
  }

}

