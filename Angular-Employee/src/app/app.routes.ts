import { RouterModule,Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

export const routes: Routes =
[
  {
    path: "",
    component: EmployeesComponent,
  },
  {
    path: "employees",
    component: EmployeesComponent,
  },
  {
    path:"employees/add",
    component: AddEmployeeComponent
  },
  {
    path:"employees/edit/:employeeId",
    component: EditEmployeeComponent,
  }
];
