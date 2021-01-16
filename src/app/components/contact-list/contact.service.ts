import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactModel } from './contact.model'; //model for fetched array of contacts

@Injectable()
export class ContactService {
  externalServerUrl: string = 'http://demo.sibers.com/users'; //url to get data from
  contactList: ContactModel[];
  contactListChanged = new EventEmitter<ContactModel[]>();

  constructor(private httpClient: HttpClient) {}

  fetchContactList(): Observable<ContactModel[]> {
    return this.httpClient
      .get<ContactModel[]>(this.externalServerUrl)
      .pipe(
        tap((result: ContactModel[]) => {
          result.sort((a, b) => {
            const nameA: string = a.name;
            const nameB: string = b.name;
            return nameA.localeCompare(nameB); //sort all elements of array by first char of key name
          });
        })
      )
      .pipe(
        tap((result: ContactModel[]) => {
          this.contactList = result; //assign contactList as new array of fetched contacts
        })
      );
  }

  addNewContact(name: string, phone: string) {
    let id = this.contactList.length;
    let newContact = new ContactModel(name, phone, id); //adds new contact based on ContactModel
    this.contactList.push(newContact); //repeat sorting of contactList
    this.contactList.sort((a, b) => {
      const nameA: string = a.name;
      const nameB: string = b.name;
      return nameA.localeCompare(nameB);
    });
    this.contactListChanged.emit(this.contactList.slice()); //creates new event to catch it in other components
  }

  deleteContact(id: number) {
    this.contactList = this.contactList.filter((contact) => contact.id != id);
    this.contactListChanged.emit(this.contactList.slice()); //creates new event to catch it in other components
    console.log(this.contactList.length);
  }
}
