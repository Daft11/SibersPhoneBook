import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddContactFormComponent } from '../add-contact-form/add-contact-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private dialog: MatDialog) {}

  onAddContactClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(AddContactFormComponent, dialogConfig);
  }
}
