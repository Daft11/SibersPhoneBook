import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddContactFormComponent } from '../add-contact-form/add-contact-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  onAddContactClick(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true; //when dialog opens sets autofocus on form input

    this.dialog.open(AddContactFormComponent, dialogConfig);
  }
}
