import { EmployeesService } from './../services/employees.service';
import { Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {

  employees: Employee[] =[];

  constructor(private employeesService: EmployeesService, private router: Router) {}

  ngOnInit(): void
  {
    this.employeesService.getAllEmployees()
      .subscribe({
        next: (employees) => {
          this.employees = employees;
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        }
      });
  }


  deleteEmployee(employeeId: string) {
    this.employeesService.deleteEmployee(employeeId).subscribe({
      next: () => {

        this.employees = this.employees.filter(employee => employee.employeeId !== employeeId);
        console.log('Employee deleted successfully');
      },
      error: (err) => {
        console.error('Error occurred while deleting employee:', err);
      }
    });
  }

}
