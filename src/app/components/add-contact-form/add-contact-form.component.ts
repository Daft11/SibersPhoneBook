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
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSaveClick() {
    //on click closing window and passing data from viewed input fields to component wich called modal form
    this.dialogRef.close({
      name: this.nameInputRef.nativeElement.value,
      phone: this.phoneInputRef.nativeElement.value,
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
