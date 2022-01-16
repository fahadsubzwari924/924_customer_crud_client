import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { UtilService } from '@core/services/util.service';
import { HttpService } from '@core/services/http.service';
import { CustomersService } from '@core/services/customers.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MdbModalModule,
    MdbFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [UtilService, HttpService, CustomersService, MdbModalService]
})
export class MockDependenciesModule { }
