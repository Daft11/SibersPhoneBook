import { Component, EventEmitter } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent {
  filterValue: string;
  filterInputChanged = new EventEmitter();
  constructor(private contactService: ContactService) {}

  onKeyUp(event: KeyboardEvent): void {
    let value = (event.target as HTMLInputElement).value;
    this.contactService.valueForFiltering = value;
    this.contactService.filter();
    if (value) this.contactService.isFilterEnabled = true;
    else this.contactService.isFilterEnabled = false;
  }
}
