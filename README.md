# Phone Book for Sibers

Test project from [Sibers](https://www.sibers.com/).<br/>
Web version of classical Phone Book. Here you can write down all your contacs and save it to browser local storage, so all data will stay with you even after page refresh.
Also you can have fun with search field. It can filter your contacts by name or number.
Every contact should have name (at least 2 latin characters) and phone number (at least 6 digits), email not required.
In addition you can check contact details and fix some information.

App was designed to work with all supported latest versions browsers ( Chrome, Firefox, Safari и IE).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Getting Started:<br/>
To get started you need to have instaled on your machine [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [NPM](https://www.npmjs.com/get-npm) , [Angular](https://cli.angular.io/) (version 11.0.4 or later) and some text editor for code (I'm using Visual Studio Code).<br/>When all set, open Git bash and follow the steps:
  1) Clone repository via comand: `git clone https://github.com/Daft11/SibersPhoneBook.git`
  2) Fall in to the folder with project `cd SibersPhoneBook`
  2) Run `npm install` to install all packages app needs.
  3) Run `ng serve` to run Angular development server (add flag `-o` to open it in browser on load)
  
 Greate now you should have working live server.<br/>
 Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Project structure

Whole project divided to components and services. Every component have it's own template styles and logic. Components comunicate with services (in this case data providers).

First of all we have our app.module wich is serve as a center to all modules. Here we declare all modules (components, services, models etc.) to let them (modules) kwon about each other existance. Also here we declare AppComponent wich will contain all other components.

So, what do we have to work with? This project holds on five components, two services and one model.<br/>
At first i want to tell you about services, because each component works with at least one of the services.

## Services

First thing first and here we have our "data manipulator service", `ContactService`. <br/>
It's fetching, store, changes and return data we use in components. First thing we have on display when load web page is list of all contacts. This list is displayed via `ContactListComponent`. Using `directive OnInit` in `contact-list.component.ts` we requesting our `ContactService` for data to display via method getContactList(). This method will check `localStorage` for data to fetch first and if there is no data then it will fetch data store it in `localStorage` and create observable (`contactListChanged` of type `EventEmitter`).<br/>
On every change `contactListChanged` emit this changes. Other components subscribing on this event and store data every time it's changes in `ContactService`.
Also component instance of class `ContactService` to work with methods from `ContactService`, such as `getContactList()`, `addNewContact()`, `deleteContact()` or `filter()`.

The second service is `FormService` wich is a service that provides other components data to validate inputs and to build forms. It is imported to `AddContactFormComponent` and  `ContactDetailComponent`.<br/>
This components changes existed or created new contacts.

## ContactModel and DirtyContactModel

Are serving as an instance of element in data array. `DirtyContactModel` is using only once, when we fetch data from external server. `ContactModel` always in touch. Using it every time need to work with data.<br/>And again, when we need to use it in the component or service we shold import it in via `import { ModuleName } from "path to the ModuleName"`

## Components

There five components, most of them already named. 
 1) `HeaderComponent` - it is a header of web page it holds button wich calls `AddContactFormComponent` as a modal dialog via imported material component Matdialog<br/>
 
 2) `AddContactFormComponent` - this component have imported `ContactService` and `FormService` instances inside. Both of services do their duty: <br/>
 
      `FormService` - validates the form and fetching data from it;<br/>
      `ContactService` - recive new contact data and creates `new ContactModel(...data)`, push it in to the `contactList`, seting a new data in `localStorage` of browser and emit changes via `contactListChanged.emit(contactList)`(wich is `EventEmitter`).
    

 3) `ContactFilterComponent` - it is a search module. Basicly it is also using `ContactService` but when seach input value changes, `ContactService` do not changes main data array `contactList`. Service ceates copy of `contactList` and store it to the new variable `filtredContactList`. There is defenetly could be a beter way but this new array and marker `isFilterEnabled` makes possible to change data (add new contact or change old one) and stay on filtred list of all contacts.<br/>
 
    Other way, every time we filtering `contactList` and add new contact filter would be erased by a new `contactList`.<br/>
    It is the way i found to save state of search and change `contactList` at the same time.<br/>
    
 4) `ContactListComponent` - the first we see when load an app. it is using `ContactService` to display list of all contacts. Also there is alphabet sorting wich realised via iternal method `filterByChar(char)` and default angular directive `ngFor="let contact of filterByChar(char)"` (assign in html template of ContactListComponent).<br/>
 
 5) `ContactDetailComponent` - each contact have id and each contact element of the listed in `ContactListComponent` contact have method `(click)="onDetailClick($event)`. On click it will initiate new MatDialog with `ContactDetailComponen` in. Here are imported `ContactService` and `FormService` instances. And as before, `FormService` is validate and  collect data, `ContactService` makes changes in data and push it to `localStorage`





