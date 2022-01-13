import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@core/constants/global.constants';
import { CreateComponent } from 'app/modules/customers/create/create.component';
import { UtilService } from '@core/services/util.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalRef: MdbModalRef<CreateComponent> | null = null;

  constructor(private us: UtilService) { }

  ngOnInit(): void {
  }

  addCustomer() {
    this.modalRef = this.us.showModal(CreateComponent, {
      data: { title: GlobalConstants.titles.customer.add },
      modalClass: 'modal-lg',
    });
    this.modalRef.onClose.subscribe((data) => {
      this.modalRef.close();
      if (data) this.us.notifyOther({event: 'refreshGrid'});
    });
  }

}
