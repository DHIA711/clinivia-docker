import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DepartmentListService } from '../department-list/department-list.service';
import { DepartmentList } from '../department-list/department-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class AddDepartmentComponent {
  departForm: UntypedFormGroup;
  constructor(private router:Router ,private fb: UntypedFormBuilder, public departmentListService: DepartmentListService) {
    this.departForm = this.fb.group({
      d_no : ['', [Validators.required]],
      d_name: ['', [Validators.required]],
      d_description: ['', [Validators.required]],
      d_date: ['', [Validators.required]],
      d_head: ['', [Validators.required]],
      d_status: ['Active', [Validators.required]],
    });

  }
  onSubmit() {
    console.log('Form Value', this.departForm.value);
    this.departmentListService.addDepartmentList(this.departForm.value);
    //this.router.navigate(["/admin//departments/department-list"]);
  }
}
