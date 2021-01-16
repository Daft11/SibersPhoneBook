import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactModel } from '../contact-list/contact.model';
import { ContactService } from '../contact-list/contact.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
  addContactForm: FormGroup;

  constructor(
    private contactService: ContactService, //will help us to push new data to contactList
    private dialogRef: MatDialogRef<AddContactFormComponent>
  ) {}

  ngOnInit(): void {
    this.addContactForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSaveClick(): void {
    //on click closing window and passing data from viewed input fields to contactService
    const name = this.addContactForm.value.name;
    const phone = this.addContactForm.value.phone;
    this.contactService.addNewContact(name, phone);
    console.log(this.addContactForm);

    this.dialogRef.close(); //closing modal window
  }

  onCloseClick(): void {
    this.dialogRef.close(); //closing modal window
  }
}
