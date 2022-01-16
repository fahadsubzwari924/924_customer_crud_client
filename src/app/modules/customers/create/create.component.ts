import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
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
  public modalRef: MdbModalRef<CreateComponent>

  constructor(
    public us: UtilService,
    private cs: CustomersService,
    // public modalRef: MdbModalRef<CreateComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.details) this.populateForUpdate(this.details);
  }

  createAndUpdate() {
    const customerId = this.details?._id ?? null;
    if (!customerId) {
      this.cs.createAndUpdate(this.customer.value)
      .subscribe((res) => {
        if (!res) this.us.showAlert('error', 'Error!', res.message);
        this.us.showAlert('success', 'Congratulations!', 'Customer created');
        this.us.activeModalRef.close(res ? true : false);
      })
    } else {
      this.cs.update(this.customer.value, customerId)
      .subscribe((res) => {
        if (!res) this.us.showAlert('error', 'Error!', res.message);
        this.us.showAlert('success', 'Congratulations!', 'Customer updated');
        this.us.activeModalRef.close(res ? true : false);
      })
    }
  }

  populateForUpdate(data: Customer) {
    FormsConstants.createCustomer.forEach((field) => {
      this.customer.get(field.name).setValue(data[field.name]);
    });
  }

  createForm(){
    this.customer = this.us.customCreateForm(FormsConstants.createCustomer);
  }

  // close(){
  //   this.modalRef.close(false);
  // }
}
