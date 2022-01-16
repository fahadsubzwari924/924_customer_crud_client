import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MockDependenciesModule } from 'app/modules/mock-dependecies/mock-dependencies.module';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreateComponent } from './create.component';
import {
  fillCustomerForm,
  setFieldValue,
} from '@core/services/testing-helper.service';
import { MockData } from '@core/constants/mock-data.constants';
import { DebugElement } from '@angular/core';
import { CustomersService } from '@core/services/customers.service';
import { of } from 'rxjs';
import { UtilService } from '@core/services/util.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let debugElement: DebugElement;
  let customerService: CustomersService;
  let createCustomerSpy: any;
  let utilService: UtilService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
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
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    customerService = TestBed.inject(CustomersService);
    utilService = TestBed.inject(UtilService);
    createCustomerSpy = spyOn(customerService, 'createAndUpdate')
      .and.callThrough()
      .and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if name field left empty', () => {
    const form = component.customer;
    expect(form.valid).toBeFalsy();
    const nameInput = form.controls.name;
    nameInput.setValue('John Peter');
    expect(nameInput.valid).toBeTruthy();
  });

  it('should show error if email not valid', () => {
    const form = component.customer;
    expect(form.valid).toBeFalsy();
    const emailInput = form.controls.email;
    emailInput.setValue('root123');
    expect(emailInput.valid).toBeFalsy();
  });

  it('should not show error on email field if email is valid', () => {
    const form = component.customer;
    expect(form.valid).toBeFalsy();
    const emailInput = form.controls.email;
    emailInput.setValue('root123@gmail.com');
    expect(emailInput.valid).toBeTruthy();
  });

  it('should form be invalid if name and email fields left empty', () => {
    let form = component.customer;
    component.createForm();
    fillCustomerForm(fixture, MockData.customerWithEmptyNameAndEmail);
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
  });

  it('should show error on template if name will be empty', () => {
    let form = component.customer;
    component.createForm();
    fixture.detectChanges();
    setFieldValue(fixture, 'name', '');
    let nameError = debugElement.query(By.css('span.name')).nativeElement
      .innerText;
    expect(nameError).toEqual('Name is required');
  });

  it('Should create button disabled if validation errors occur', () => {
    component.createForm();
    fixture.detectChanges();
    fillCustomerForm(fixture, MockData.customerWithEmptyNameAndEmail);
    fixture.detectChanges();
    let createBtn = debugElement.query(
      By.css('button.create-customer')
    ).nativeElement;
    expect(createBtn.disabled).toBeTruthy();
  });

  it('Should call customer service create function on button click', () => {
    debugElement
      .query(By.css('button.create-customer'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(createCustomerSpy).toHaveBeenCalled();
  });

  it('Should call customer service create function with the same values as provided in Html form', () => {
    component.createForm();
    fixture.detectChanges();
    fillCustomerForm(fixture, MockData.customer);
    fixture.detectChanges();
    debugElement
      .query(By.css('button.create-customer'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(createCustomerSpy).toHaveBeenCalledWith(MockData.customer);
  });

  it('Should call customer service create function with the same values as provided in Html form', () => {
    component.createForm();
    fixture.detectChanges();
    fillCustomerForm(fixture, MockData.customer);
    fixture.detectChanges();
    debugElement
      .query(By.css('button.create-customer'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(utilService.activeModalRef).toBeFalsy();
  });
});
