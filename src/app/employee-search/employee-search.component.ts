import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {


employees: Employee[] = [];

employee: any = null;

employeeAnnualCalculate: any = null;

currentPage: number = 1;

itemsPerPage: number = 3;

employeeId: number = 0;

employeeIdForCalculation: number = 0;

errorMessage: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees():void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (error) => this.errorMessage = 'Error loading employees'
    })
      
  }

  getEmployeeById():void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => this.employee = data,
      error: (error)  => this.errorMessage = 'Employee dont found'
    })
  }

  caluculateEmployeeAnnualSalary():void {
    this.employeeService.calculateEmployeeAnnualSalary(this.employeeIdForCalculation).subscribe({
      next: (employee) => {
        if (employee.status === 'UP') this.employeeAnnualCalculate = employee;
       else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The employee was found but the status is not UP",
        });
      }
    },
      error: (error) => this.errorMessage = 'Employee dont found'
    })
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

}
