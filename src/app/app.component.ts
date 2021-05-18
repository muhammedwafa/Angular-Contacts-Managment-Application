import { error } from '@angular/compiler/src/util';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //(01) defining a list of employees
  public employees: Employee[];
  //(08) defining an employee to be binded to the update Form.
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  //(02) injecting the Employee Service to the  Employee component
  constructor(private employeeService: EmployeeService) { }

  // (04) implementing the OnInit interface, so that we load the emplooyees up on loading this component.
  ngOnInit() {
    this.getEmployees();
  }

  // (03) calling the service to get all employees
  public getEmployees() {
    this.employeeService.getEmployees().subscribe( //this will make us notified when something happens
      (response: Employee[]) => { //if the response is employee, add it to the response body
        this.employees = response;
      },
      (error: HttpErrorResponse) => { //if the response is error, display the error using alert.
        alert(error.message);
      }
    )
  }

  // (05:) creating a on open modal function programatically
  public onOpenModal(employee: Employee, mode: string): void {
    const contianer = document.getElementById('main-container'); //getting acces to the entire div
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    //check whch button the user clicked
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee; //binging the employee to the form for editing.
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#delteEmployeeModal');
    }

    // adding the button after the approperiate checks
    contianer.appendChild(button);
    button.click();
  }

  // (06) getting the form data and sending it to the server.
  public onAddEmployee(addForm: NgForm): void {
    // calling the close button to make the form disappear after entering the data.
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset(); //clearing the form after process
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // (07) Updating Contacts
  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form').click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // (09) delete Contact
  public onDeleteEmployee(employeeId: number): void {
    document.getElementById('delete-employee-form').click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  // (10) creating a search function
  public searchEmployees(key: string): void {

    //all contacts that matches the key.
    const result: Employee[] = [];
    for (const employee of this.employees) {

      //check if the key is not -1(is found)
      if (employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || employee.imageUrl.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {

        //if found, add contact to the contact list.
        result.push(employee);
        this.employees = result;
      }

      //check if the result is empty or the provided key was not valid
      if (result.length === 0 || !key) {
        this.getEmployees;
      }
    }

  }

}
