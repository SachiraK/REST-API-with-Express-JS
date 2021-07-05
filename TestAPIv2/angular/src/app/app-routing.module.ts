import { HomeComponent } from './home/home.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DepartmentOverviewComponent } from './department-overview/department-overview.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {
    path:'departments',component:DepartmentListComponent,
    children:[
      {path:"add-department",component:AddDepartmentComponent},
    //   {path:"delete-department",component:DeleteDepartmentComponent},
    ]
  },
  {path:'employees',component:EmployeeListComponent},
  {path:"delete-department",component:DeleteDepartmentComponent},
  // {path:"add-department",component:AddDepartmentComponent},

  {
    path:"departments/:id",component:DepartmentDetailsComponent,
    children:[
      {path:"employees", component: DepartmentOverviewComponent},
      {path:"update-department",component:UpdateDepartmentComponent},
    ]
  },

  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DepartmentListComponent,
                                  EmployeeListComponent,
                                  PageNotFoundComponent,
                                  DepartmentDetailsComponent,
                                  DepartmentOverviewComponent,
                                  AddDepartmentComponent,
                                  DeleteDepartmentComponent,
                                  UpdateDepartmentComponent]
