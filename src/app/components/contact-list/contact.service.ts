import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DirtyContactModel } from './contact.model'; //model for fetched array of contacts
import { ContactModel } from './contact.model'; //model for cleaned array of contacts

@Injectable()
export class ContactService {
  externalServerUrl: string = 'http://demo.sibers.com/users'; //url to get data from
  contactList: ContactModel[];
  filtredContactList: ContactModel[];
  isFilterEnabled: boolean = false;
  valueForFiltering: string;
  contactListChanged = new EventEmitter<ContactModel[]>();

  constructor(private httpClient: HttpClient) {}

  getContactList() {
    const localStorageData = JSON.parse(localStorage.getItem('contactList')); //will return null or data
    if (localStorageData) {
      this.contactList = localStorageData;
      setTimeout(() => {
        this.emitContactListChanges();
      }, 0);
    } else {
      this.fetchContactList().subscribe(() => {
        this.emitContactListChanges();
      });
    }
  }

  fetchContactList() {
    //fetching contact list form external server
    return this.httpClient
      .get(this.externalServerUrl)
      .pipe(
        tap((result: DirtyContactModel[]) => {
          return result.forEach((contact) => {
            //clean up fetch data from keys we will not use
            delete contact.username;
            delete contact.posts;
            delete contact.accountHistory;
            delete contact.website;
          });
        })
      )
      .pipe(
        tap((result: ContactModel[]) => {
          //sort data by alphabet
          this.sortContactsAlphabet(result);
        })
      )
      .pipe(
        tap((result: ContactModel[]) => {
          this.contactList = result; //assign contactList as new array of fetched contacts
          localStorage.setItem('contactList', JSON.stringify(result)); //push new data to local storage
        })
      );
  }

  emitContactListChanges(): void {
    if (this.isFilterEnabled) {
      //if user while have some text in filter input will change elemets this function will emit FILTRED list and filter deleted or added contacts
      this.contactListChanged.emit(
        this.filtredContactList.slice() as ContactModel[]
      );
      this.filter();
    } else {
      this.contactListChanged.emit(this.contactList.slice() as ContactModel[]); //if filtering is OFF will emit not filtred contactList
    }
  }

  addNewContact(name: string, phone: string, email: string): void {
    const id = this.contactList.length; //creates new id
    const newContact = new ContactModel(name, phone, id, email); //adds new contact based on ContactModel
    this.contactList.push(newContact); //repeat sorting of contactList
    this.sortContactsAlphabet(this.contactList);
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
    this.emitContactListChanges(); //creates new event to catch it in other components
  }

  deleteContact(id: number): void {
    this.contactList = this.contactList.filter((contact) => contact.id != id);
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
    this.emitContactListChanges(); //creates new event to catch it in other components
  }

  filter(): void {
    const value = this.valueForFiltering.toLowerCase();
    this.filtredContactList = this.contactList; //creates a copy of contacList to prevent changes in main
    this.filtredContactList = this.filtredContactList.filter(
      (contact: ContactModel) => {
        const name = contact.name.toLowerCase();
        const phone = contact.phone;
        if (name.includes(value) || phone.includes(value)) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.contactListChanged.emit(this.filtredContactList.slice());
  }

  sortContactsAlphabet(contactList: ContactModel[]): ContactModel[] {
    //sort all elements of array by first char of key NAME in alphabel order
    return contactList.sort((a, b) => {
      const nameA: string = a.name;
      const nameB: string = b.name;
      return nameA.localeCompare(nameB);
    });
  }
}
