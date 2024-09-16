import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from './../services/employees.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  employeeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private employeesService: EmployeesService, private router: Router) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      homeAddress: ['', Validators.required],
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
    }
  }


  onSubmit(): void {
    console.log('Form validity:', this.employeeForm.valid);

    console.log('Name valid:', this.employeeForm.get('name')?.valid);
    console.log('Email valid:', this.employeeForm.get('email')?.valid);
    console.log('Mobile Number valid:', this.employeeForm.get('mobileNumber')?.valid);
    console.log('Home Address valid:', this.employeeForm.get('homeAddress')?.valid);
    console.log('Photo selected:', !!this.selectedFile);

    if (this.employeeForm.invalid || !this.selectedFile) {
      console.error('Form is invalid or no file selected');
      return;
    }

    console.log('Form is valid, proceeding to submit the form...');

    const formData = new FormData();
    formData.append('name', this.employeeForm.get('name')?.value);
    formData.append('email', this.employeeForm.get('email')?.value);
    formData.append('mobileNumber', this.employeeForm.get('mobileNumber')?.value);
    formData.append('homeAddress', this.employeeForm.get('homeAddress')?.value);
    formData.append('photo', this.selectedFile);

    this.employeesService.addEmployee(formData).subscribe({
      next: () => {
        console.log('Employee added successfully');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error occurred while adding employee:', err);
      }
    });
  }
}

