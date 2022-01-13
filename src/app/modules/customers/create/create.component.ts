import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from '@core/services/util.service';
import { FormGroup } from '@angular/forms';
import { FormsConstants } from '@core/constants/forms.constants';
import { CustomersService } from '@core/services/customers.service';
import { Customer } from '@shared/models/customer.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  customer: FormGroup;
  title: string | null = null;
  details: Customer | null = null;

  constructor(
    public modalRef: MdbModalRef<CreateComponent>,
    private us: UtilService,
    private cs: CustomersService
  ) {}

  ngOnInit(): void {
    this.customer = this.us.customCreateForm(FormsConstants.createCustomer);
    if (this.details) this.populateForUpdate(this.details);
  }

  createAndUpdate() {
    const customerId = this.details?._id ?? null;
    this.cs.createAndUpdate(this.customer.value, customerId).subscribe((res) => {
      this.modalRef.close(res ? true : false);
    });
  }

  populateForUpdate(data: Customer) {
    FormsConstants.createCustomer.forEach((field) => {
      this.customer.get(field.name).setValue(data[field.name]);
    });
  }
}
