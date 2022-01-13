import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MDBBootstrapModule.forRoot(),
    MdbModalModule,
    CoreModule,
    MdbFormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
