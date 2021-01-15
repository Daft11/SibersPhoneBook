import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContactModel } from './contact.model'; //model for fetched array of contacts

@Injectable()
export class ContactService {
  externalServerUrl: string = 'http://demo.sibers.com/users'; //url to get from
  localstorageUrl: string = 'http://demo.sibers.com/users';
  constructor(private httpClient: HttpClient) {}
  isSoreOnlocal: boolean = false;

  fetchContactList(): Observable<ContactModel[]> {
    return this.httpClient.get<ContactModel[]>(this.externalServerUrl).pipe(
      tap((result: ContactModel[]) => {
        result.sort((a, b) => {
          const nameA: string = a.name;
          const nameB: string = b.name;
          return nameA.localeCompare(nameB); //sort all elements of array by first char of key name
        });
      })
    );
  }
}
