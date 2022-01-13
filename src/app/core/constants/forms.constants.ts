import { Validators } from '@angular/forms';

export class FormsConstants{
  public static readonly createCustomer = [
    {
      name: 'name',
      fieldValidators: [Validators.required]
    },
    {
      name: 'email',
      fieldValidators: [Validators.required, Validators.email]
    },
    {
      name: 'phone'
    },
    {
      name: 'address'
    },
    {
      name: 'age'
    }
  ]
}
