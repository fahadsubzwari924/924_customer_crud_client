import { Injectable, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  mdCmp: MdbModalRef<Component>;
  private notify = new BehaviorSubject<any>('hello');
  public notifyObs$ = this.notify.asObservable();

  constructor(private modalService: MdbModalService, private fb: FormBuilder) { }

/**
   * This is a request to get data or information from a database collection or combination of collections.
   *@function
   *
   * @param {Component} cmp - Component that has to be open as modal.
   *
   * @returns Returns nothing. It just open up the modal bas on given component
   */

  showModal(cmp: any, modalOptions?: any){
    modalOptions = modalOptions ??{ modalClass: 'modal-lg'}
    this.mdCmp = this.modalService.open(cmp, modalOptions);
    return this.mdCmp;
  }


/**
   * This is a request to get data or information from a database collection or combination of collections.
   *@function
   *
   * @param {Array} fieldsArr - An array of object having details of each field i.e field name, isRequired etc.
   *
   * @returns Returns a form of type FormGroup that created based on provided array of fields
   */

  customCreateForm(fieldsArr: any[]) {
    const formGroup = new FormGroup({});
    fieldsArr.forEach(f => {
      if (f.isArray) {
        if (f.defaultValue === null) {
          // seems to never happen ? because you would need 1 default value for each element of your array, not just one defaultValue.
          // formObject[f.name] = this.fb.array([]);
          // formGroup.addControl(f.name, []);
          formGroup.addControl(f.name, this.fb.array([]));
        } else {
          formGroup.addControl(f.name, this.fb.array([this.customCreateNestedFormGroup(f.nestedFieldsArr)])); // removed the FormArray layer
        }
      }
      else if (f.isGroup) {
        if (f.defaultValue === null) {
          // seems to never happen ? because you would need 1 default value for each element of your array, not just one defaultValue.
          // formObject[f.name] = this.fb.array([]);
          // formGroup.addControl(f.name, []);
        } else {
          formGroup.addControl(f.name, this.customCreateNestedFormGroup(f.nestedFieldsArr)); // removed the FormArray layer
        }
      } else {
        // const formControl = new FormControl(f.defaultValue ? f.defaultValue : '', f.isRequired ? Validators.required : Validators.nullValidator);
        const formControl = new FormControl(f.defaultValue ? f.defaultValue : '', f.fieldValidators ?? Validators.nullValidator);
        formGroup.addControl(f.name, formControl);
      }
    });
    return formGroup;
  }


/**
   * This is a request to get data or information from a database collection or combination of collections.
   *@function
   *
   * @param {Array} nestedFieldsArr - An array of objects having details of each nested field i.e field name, isRequired etc.
   *
   * @returns Returns a form of type FormGroup that created based on provided array of fields
   */
  private customCreateNestedFormGroup(nestedFieldsArr: any[]) {
    const nestedFormGroup = new FormGroup({});
    nestedFieldsArr.forEach(f => {
      // const formControl = new FormControl(f.defaultValue ? f.defaultValue : '', f.isRequired ? Validators.required : Validators.nullValidator);
      const formControl = new FormControl(f.defaultValue ? f.defaultValue : '', f.fieldValidators ??  Validators.nullValidator);
      if (f.isDisabled) {
        formControl.disable();
      }
      nestedFormGroup.addControl(f.name, formControl);
    })
    return nestedFormGroup;
  }


/**
   * This function is used to pass data between unrelated components.
   *@function
   *
   * @param {Any} data - any data that hast be shared between 2 components.
   *
   * @returns It just pushes the new data to component that is listening for signal
   */

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

}
