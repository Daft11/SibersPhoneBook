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

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AddContactFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((resullt) => {
      // console.log('The dialog was closed');
      console.log(resullt);
    });
  }
}
