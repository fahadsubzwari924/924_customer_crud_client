import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApiConstants } from '@constants/api.constants';
import { Observable } from 'rxjs';
import { Customer } from '@shared/models/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private _http: HttpService, private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this._http.get(ApiConstants.customers);
  }

  createAndUpdate(body: any){
    return this._http.post(ApiConstants.createCustomer,body);
  }

  update(body: any, customerId: string){
    let apiUrl = `${ApiConstants.customers}/${customerId}`;
    return this._http.put(apiUrl, body);
  }

  remove(customerId: string): Observable<any>{
    let apiUrl = `${ApiConstants.customers}/${customerId}`;
    return this._http.delete(apiUrl);
  }

  getCustomerById(customerId: string): Observable<Customer>{
    let apiUrl = `${ApiConstants.customers}/${customerId}`;
    return this._http.get(apiUrl);
  }

  sortCustomers(sortKey: string, sortOrder: number): Observable<Customer[]>{
    let apiUrl = `${ApiConstants.customers}?${sortKey}=${sortOrder}`;
    return this._http.get(apiUrl);
  }

}
