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
  employee: Employee | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  employeeId: number | null = null;
  errorMessage: string = '';



  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {

  }

  getEmployees():void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (error) => this.errorMessage = 'Error loading employees'
    })
      
  }

  searchEmployee(): void {
    if (this.employeeId === null || this.employeeId === 0) {
      this.employee = null; 
      this.getEmployees(); 
    } else {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (data) => this.employee = data,
        error: (error) => {
          this.employee = null; 
          this.errorMessage = 'Employee not found';
        }
      });
    }
  }


  calculateAnnualSalary(salary: number): number {
    return salary * 12; // Assuming monthly salary to annual salary conversion
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
