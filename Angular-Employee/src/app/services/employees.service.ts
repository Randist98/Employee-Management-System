import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
 baseApiUrl: string = "https://localhost:7005";
  constructor(private http:HttpClient) { }

  getAllEmployees(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.baseApiUrl + "/api/employees");
  }

  addEmployee(employeeData: FormData): Observable<any> {
    return this.http.post(this.baseApiUrl + "/api/employee", employeeData);
  }

  updateEmployee(employeeId: string, employeeData: FormData): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/api/employee/${employeeId}`, employeeData);
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseApiUrl}/api/${employeeId}`);
  }

  deleteEmployee(employeeId: string): Observable<any>
  {
    return this.http.delete(`${this.baseApiUrl}/api/${employeeId}`);
  }

}
