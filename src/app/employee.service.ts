import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

//(00) we want the entire applicatiion to know about this service. thats is whey we do this injection.
//if we do not do this, then we would have to register this servies in the providers[], in the App module.
@Injectable({ providedIn: 'root' })

export class EmployeeService {

  //(01) definding a url for the service to be passed to the http client.
  //this url is created in environmental variables.
  private apiServerUrl = environment.apiBaseUrl;

  //(02) injecting the Http clinet to the Employee Service
  constructor(private http: HttpClient) { }

  // get all employee function
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);  // calling the server by passing the url
  }

  //method to add employee
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  //update employee
  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  //delete employee
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
  }



}
