import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/app/services/form.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private contactService: ContactService, //will help us to push new data to contactList
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    private formServie: FormService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formServie.getContactForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSaveClick(): void {
    //on click closing window and passing data from viewed input fields to contactService
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    const name = this.contactForm.value.name;
    const phone = this.contactForm.value.phone;
    const email = this.contactForm.value.email || 'none'; //if email did not entered pass 'none'
    this.contactService.addNewContact(name, phone, email); //push new new data to build contact and then emit changes in contactService
    this.dialogRef.close(); //closing modal window
  }

  onCloseClick(): void {
    this.dialogRef.close(); //closing modal window
  }
}
