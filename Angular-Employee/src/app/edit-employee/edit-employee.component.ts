import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from './../services/employees.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { error } from 'console';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
   employeeForm: FormGroup;
   selectedFile: File | null = null;
   employeeId: string | null = null;

   constructor(private fb: FormBuilder, private employeesService: EmployeesService, private router: Router, private route: ActivatedRoute )
   {
      this.employeeForm = this.fb.group
      ({
          name:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          mobileNumber:['', Validators.required],
          homeAddress:['', Validators.required],
      });
   }

  ngOnInit(): void{
    this.employeeId = this.route.snapshot.paramMap.get('employeeId');
    if(this.employeeId)
    {
      this.loadEmployeeDetails(this.employeeId);
    }
  }

  onFileSelected(event: Event): void
  {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0)
    {
      this.selectedFile = input.files[0];
      console.log('First selected:', this.selectedFile);
    }
  }

  loadEmployeeDetails(employeeId: string): void
  {
    this.employeesService.getEmployeeById(employeeId).subscribe
    ({
      next: (employee)=>
      {
        this.employeeForm.patchValue
        ({
          name: employee.name,
          email: employee.email,
          mobileNumber: employee.mobileNumber,
          homeAddress: employee.homeAddress,
        });
      },
      error: (err)=>
      {
        console.error('Error loading employee details:' ,err);
      }
    });
  }

  onUpdate(): void
  {
    if(this.employeeForm.invalid)
    {
      console.error('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.employeeForm.get('name')?.value);
    formData.append('email', this.employeeForm.get('email')?.value);
    formData.append('mobileNumber', this.employeeForm.get('mobileNumber')?.value);
    formData.append('homeAddress', this.employeeForm.get('homeAddress')?.value);

    if(this.selectedFile)
    {
      formData.append('photo', this.selectedFile);
    }

    if(this.employeeId)
    {
      this.employeesService.updateEmployee(this.employeeId, formData)
          .subscribe
          ({
            next: ()=>
            {
              console.log('Employee updated successfully');
              this.router.navigate(['/employees']);
            },
            error: (err) =>
            {
              console.error('Error occurred while updating employee:', err);
            }
          });
    }
  }
}
