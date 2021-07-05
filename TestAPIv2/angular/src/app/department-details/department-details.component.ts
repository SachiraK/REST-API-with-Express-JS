import { IEmployee } from './../employee.model';
import { DepartmentService } from './../department.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  public IsHiddenView = false;
  public IsHiddenUpdate = false;
  public departmentID: any;
  public task_list = ["View Employees","Update Department", "Back", "Delete"]
  employees?:IEmployee[];

  constructor(private _departmentServie: DepartmentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = Number(params.get('id'));
      this.departmentID = id;
    })
    this._departmentServie.getEmployeeForDepartment(this.departmentID)
          .subscribe(res => {
            let response =JSON.parse(JSON.stringify(res));
            this.employees = response;
          })
  }

  gotoDepartments(){
    this.router.navigate(["../"],{relativeTo:this.route})
    .then(()=>{
      window.location.reload();
    })
  }

  showEmployees(){
    if (!this.IsHiddenView){
      this.router.navigate([`../${this.departmentID}/employees`],{relativeTo:this.route})
    } else{
      this.router.navigate([`../${this.departmentID}`],{relativeTo:this.route})
    }
    this.IsHiddenView = true;
    this.IsHiddenUpdate = false
  }

  delete() {
    this._departmentServie.deleteSingleDepartment(this.departmentID)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(["../"],{relativeTo:this.route});
        },
        error => {
          console.log(error);
        });
  }

  update(){
    if (!this.IsHiddenUpdate){
      this.router.navigate([`../${this.departmentID}/update-department`],{relativeTo:this.route})
    } else{
      this.router.navigate([`../${this.departmentID}`],{relativeTo:this.route})
    }
    this.IsHiddenUpdate = true;
    this.IsHiddenView = false
  }
}
