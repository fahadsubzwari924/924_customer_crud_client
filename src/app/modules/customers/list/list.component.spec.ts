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


  const fillCustomerForm = () => {
    Object.keys(MockData.customer).forEach(k => {
      setFieldValue(customerFixture, k, MockData.customer[k]);
    })
  }

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
    addCustomerSpy = spyOn(customerService, 'createAndUpdate').and.callThrough();
  });


  it('should open create customer modal on add customer button click', () => {
    expect(utilService.activeModalRef).toBeFalsy();
    debugElement.query(By.css('button.create')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(utilService.activeModalRef).toBeTruthy();
  });

  // it('add customer function with same values that entered in form by user', () => {
  //   expect(component.modalRef).toBeFalsy();
  //   customerCmp.details = null;
  //   debugElement.query(By.css('button.btn'))
  //     .triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   fillCustomerForm();
  //   customerDebugElement.query(By.css('button.btn'))
  //     .triggerEventHandler('click', null);
  //   customerFixture.detectChanges();
  //   expect(component.modalRef).toBeTruthy();
  //   expect(addCustomerSpy).toHaveBeenCalledWith(MockData.customer);
  // });

  // it('should open create customer modal on add customer button click', () => {
  //   component.customers = MockData.customersList;
  //   fixture.detectChanges();
  //   expect(utilService.activeModalRef).toBeFalsy();
  //   fixture.debugElement.query(By.css('button.update')).triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(utilService.activeModalRef).toBeTruthy();
  // });

  // it('should open update customer modal and customer modal should have right title', () => {
  //   expect(utilService.activeModalRef).toBeFalsy();
  //   console.log('update button : ', debugElement.query(By.css('.update')));
  //   debugElement.query(By.css('.update'))
  //     .triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   let customerModalTitle = customerDebugElement.query(By.css('#customerModalTitle')).nativeElement;
  //   expect(utilService.activeModalRef).toBeTruthy();
  //   expect(customerModalTitle.textContent).toContain('Update Customer');
  // });
});
