/*Service provides other components data and methods to manipulate contacts*/
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DirtyContactModel } from '../components/contact-list/contact.model'; //model for fetched array of contacts
import { ContactModel } from '../components/contact-list/contact.model'; //model for cleaned array of contacts

@Injectable()
export class ContactService {
  externalServerUrl: string =
    'https://cors-anywhere.herokuapp.com/http://demo.sibers.com/users'; //url to get data from
  contactList: ContactModel[];
  filtredContactList: ContactModel[];
  isFilterEnabled: boolean = false; //marks searching status, if search field isn't empty becomes true, otherwise false
  valueForFiltering: string;
  contactListChanged = new EventEmitter<ContactModel[]>(); //every changes with contactList will be emited though this EventEmitter

  constructor(private httpClient: HttpClient) {}

  getContactList() {
    const localStorageData = JSON.parse(localStorage.getItem('contactList')); //will return null or data
    if (localStorageData) {
      //if there is some data, it will be stored into local variable for manipulations with in future
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
          return result.forEach((contact) => ({
            //clean up fetch data from keys we will not use
            phone: contact.phone,
            id: contact.id,
            email: contact.email,
            company: contact.company,
            favorite: contact.favorite,
            avatar: contact.avatar,
          }));
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
      //if search field ISN'T EMPTY will emit new array of FILTRED contactList

      this.contactListChanged.emit(
        this.filtredContactList.slice() as ContactModel[]
      );
      this.filter();
    } else {
      //if search field EMPTY will emit NOT filtred contactList
      this.contactListChanged.emit(this.contactList.slice() as ContactModel[]);
    }
  }

  addNewContact(
    name: string,
    phone: string,
    email: string,
    id: number = this.contactList.length
  ): void {
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
