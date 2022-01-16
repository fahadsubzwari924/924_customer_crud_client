import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomersService } from '@core/services/customers.service';
import { Subscription } from 'rxjs';
import { UtilService } from '@core/services/util.service';
import { CreateComponent } from '../create/create.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GlobalConstants } from '@constants/global.constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  modalRef: MdbModalRef<CreateComponent> | null = null;
  customers: any[] = []
  headElements = [
    { label: 'Name', value: 'name', isSort: true },
    { label: 'Email', value: 'email', isSort: false },
    { label: 'Age', value: 'age', isSort: false },
    { label: 'Phone', value: 'phone', isSort: false },
    { label: 'Address', value: 'address', isSort: false },
    { label: 'Date', value: 'createdAt', isSort: true },
  ];
  sortOrder: number = null;
  constructor(private cs: CustomersService, private us: UtilService) {
    this.subscription = this.us.notifyObs$.subscribe((s) => {
      if (s?.event === 'refreshGrid') {
        this.fetchCustomers();
      }
    });
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  addCustomer() {
    this.us.activeModalRef = this.us.showModal(CreateComponent, {
      data: { title: GlobalConstants.titles.customer.add },
      modalClass: 'modal-lg',
    });
    this.us.activeModalRef.onClose.subscribe((data) => {
      this.us.activeModalRef.close();
      if (data) this.fetchCustomers();
    });
  }

  fetchCustomers() {
    this.cs.getCustomers().subscribe(res => {
      this.customers = res;
    })
  }

  remove(customerId: string) {
    if (customerId) {
      this.cs.remove(customerId).subscribe((res) => {
        if (res) {
          this.us.showAlert('success', 'Congratulations!', 'Customer removed');
          this.fetchCustomers();
        }
      });
    }
  }

  update(customerId: string) {
    if (customerId) {
      this.cs.getCustomerById(customerId).subscribe((res) => {
        if (res) {
          this.us.activeModalRef = this.us.showModal(CreateComponent, {
            data: {
              title: GlobalConstants.titles.customer.update,
              details: res,
            },
            modalClass: 'modal-lg',
          });
          this.us.activeModalRef.onClose.subscribe((response) => {
            this.us.activeModalRef.close();
            if (response) this.fetchCustomers();
          });
        }
      });
    }
  }

  sort(headElem: any) {
    if (headElem.isSort) {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
      this.cs.sortCustomers(headElem.value, this.sortOrder).subscribe(res => {
        this.customers = res;
      })
    }
  }

  ngOnDestroy() {
    /* Unsubscribing from subscription to avoid memory leaks*/
    this.subscription.unsubscribe();
  }
}
