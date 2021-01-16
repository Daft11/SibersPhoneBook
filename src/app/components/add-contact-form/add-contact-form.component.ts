import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ContactService } from '../contact-list/contact.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('phoneInput') phoneInputRef: ElementRef;
  isFormValid: boolean = false;

  constructor(
    private contactService: ContactService, //will help us to push new data to contactList
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSaveClick() {
    //on click closing window and passing data from viewed input fields to contactService
    const name = this.nameInputRef.nativeElement.value;
    const phone = this.phoneInputRef.nativeElement.value;
    this.contactService.addNewContact(name, phone);
    this.dialogRef.close('contact added'); //just chekicng log
  }

  onNoClick() {
    this.dialogRef.close('window closed'); //just chekicng log
  }
}
