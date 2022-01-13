import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
     * This is a function to make http request of type GET.
     *@function GET
     *
     * @param {String} url - a string based api url from which data has to be fetched.
     *
     * @returns It returns an observable having response of http GET request
     */
  get = (url: string): Observable<any> => {
    return this.http.get(this.createUrl(url), { headers: this.getHeaders() });
  }

  /**
     * This is a function to make http request of type POST.
     *@function POST
     *
     * @param {String} url - a string based api url on which data has to be posted.
     * @param {Object} body - an object that has to be passed to server to save.
     *
     *
     * @returns It returns an observable having response of http POST request
     */
  post = (url: string, body: any, httpOptions: any = null): Observable<any> => {
    return this.http.post(this.createUrl(url), body, { headers: this.getHeaders(), ...httpOptions });
  }



  /**
     * This is a function to make http request of type PUT.
     *@function PUT
     *
     * @param {String} url - a string based api url on which data has to be updated.
     * @param {Object} body - an object that has to be passed to server to update.
     *
     *
     * @returns It returns an observable having response of http PUT request
     */
  put = (url: string, body: any): Observable<any> => {
    return this.http.put(this.createUrl(url), body, { headers: this.getHeaders() })
  }


  /**
     * This is a function to make http request of type DELETE.
     *@function DELETE
     *
     * @param {String} url - a string based api url on which data has to be removed.
     *
     *
     * @returns It returns an observable having response of http PUT request
     */
  delete = (url: string): any => {
    return this.http.delete(this.createUrl(url), { headers: this.getHeaders() });
  }


  /**
     * This is a function to set HTTP headers for each http request.
     *
     * @returns It returns an Http headers object
     */
  private getHeaders = () => {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  /**
     * This is a function to create complete api url for server.
     *
     * @param {String} url - a string based api url.
     *
     *
     * @returns It returns a concatenated url i.e base url and api url to make complete api url.
     */
  private createUrl = (url: string): string => {
    return environment.baseUrl + url;
  }
}
