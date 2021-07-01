import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
const routes: Routes = [
  { path: '', redirectTo: 'department', pathMatch: 'full' },
  { path: 'department', component: DepartmentsListComponent },
  { path: 'department/:id', component: DepartmentDetailsComponent },
  { path: 'add', component: AddDepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
