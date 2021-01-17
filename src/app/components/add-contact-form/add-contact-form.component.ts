import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../contact-list/contact.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
  addContactForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private contactService: ContactService, //will help us to push new data to contactList
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      //form validation
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(2),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9().-x]*'),
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addContactForm.controls;
  }

  onSaveClick(): void {
    //on click closing window and passing data from viewed input fields to contactService
    this.submitted = true;
    // stop here if form is invalid
    if (this.addContactForm.invalid) {
      return;
    }
    const name = this.addContactForm.value.name;
    const phone = this.addContactForm.value.phone;
    const email = this.addContactForm.value.email || 'none';
    this.contactService.addNewContact(name, phone, email);
    this.dialogRef.close(); //closing modal window
  }

  onCloseClick(): void {
    this.dialogRef.close(); //closing modal window
  }
}
