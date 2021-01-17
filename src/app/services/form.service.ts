/*Service provides other components data to validate inputs and to build form*/

import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(public formBuilder: FormBuilder) {}

  getContactForm(
    initName: string = '',
    initPhone: string = '',
    initEmail: string = ''
  ) {
    return this.formBuilder.group({
      //form validation
      name: [
        initName,
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(2),
        ],
      ],
      phone: [
        initPhone,
        [
          Validators.required,
          Validators.pattern('[0-9( ).x-]*'),
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      email: [
        initEmail,
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
}
