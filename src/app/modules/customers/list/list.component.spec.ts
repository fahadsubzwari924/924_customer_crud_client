import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CreateComponent } from '../create/create.component';
import { MockData } from '@constants/mock-data.constants';
import { CustomersService } from '@core/services/customers.service';
import { MockDependenciesModule } from 'app/modules/mock-dependecies/mock-dependencies.module';
import { setFieldValue } from '@core/services/testing-helper.service';
import { UtilService } from '@core/services/util.service';
import { Customer } from '@shared/models/customer.model';
import { Observable, of } from 'rxjs';


describe('ListComponent', () => {
  let component: ListComponent;
  let customerCmp: CreateComponent;
  let fixture: ComponentFixture<ListComponent>;
  let customerFixture: ComponentFixture<CreateComponent>;
  let debugElement: DebugElement;
  let customerDebugElement: DebugElement;
  let addCustomerSpy: any;
  let customerService: CustomersService;
  let createCustomerFormElements;
  let utilService: UtilService;
  let noDataFnSpy: any;
  let emptyCustomers$ = of([]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, CreateComponent],
      imports: [
  HttpClientModule,
        ToastrModule.forRoot(),
        MdbModalModule,
        CommonModule,
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MdbFormsModule,
        MockDependenciesModule,
      ],
      providers: [ToastrService, MdbModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    utilService = TestBed.inject(UtilService);
    debugElement = fixture.debugElement;

    customerFixture = TestBed.createComponent(CreateComponent);
    customerCmp = customerFixture.componentInstance;
    customerFixture.detectChanges();
    customerDebugElement = customerFixture.debugElement;
    customerService = TestBed.inject(CustomersService);
    // addCustomerSpy = spyOn(customerService, 'createAndUpdate').and.callThrough();
    noDataFnSpy = spyOn(customerService, 'getCustomers').and.returnValue(emptyCustomers$);
  });


  it('should open create customer modal on add customer button click', () => {
    expect(utilService.activeModalRef).toBeFalsy();
    debugElement.query(By.css('button.create')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(utilService.activeModalRef).toBeTruthy();
  });

  it('should show no data if there will be no customers', () => {
      component.customers = [];
      component.ngOnInit();
      fixture.detectChanges();
      let noDataText = debugElement.query(By.css('p.noData')).nativeElement.innerText;
      expect(noDataText).toEqual('No customers yet');
  });
});
