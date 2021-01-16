import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactService } from './components/contact-list/contact.service';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailComponent,
    HeaderComponent,
    AddContactFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
  entryComponents: [AddContactFormComponent, ContactDetailComponent],
})
export class AppModule {}
