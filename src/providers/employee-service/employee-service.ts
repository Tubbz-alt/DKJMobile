import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from '../../pages/employee';
import { User } from '../../pages/user';

@Injectable()
export class EmployeeServiceProvider {
  host = "http://192.168.8.101:8001";
  url = 'http://192.168.8.101:8001/api';

  constructor(public http: Http) {
    console.log('Hello EmployeeServiceProvider Provider');
  }

  getEmployees(): Promise<Employee[]> {
    return this.http.get(this.url+'/employees/getemployees')
              .toPromise()
              .then(response => response.json() as Employee[])
              .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.url+'/employees/getusers')
                    .toPromise()
                    .then(response => response.json() as User[])
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
