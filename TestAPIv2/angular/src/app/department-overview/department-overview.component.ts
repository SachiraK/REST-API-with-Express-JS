import { DepartmentService } from './../department.service';
import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.css']
})
export class DepartmentOverviewComponent implements OnInit {
  
  @Input("parentData") public employees:any;

  public selectedID: any;

  constructor(private _departmentServie: DepartmentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.retrieveEmployees,
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = String(this.router.url).split("/");
      this.selectedID = id[id.length-2];
    })
  }

  retrieveEmployees(): void{
    this._departmentServie.getEmployeeForDepartment(this.selectedID)
          .subscribe(res => {
            let response =JSON.parse(JSON.stringify(res));
            this.employees = response;
            console.log(response)
          })
  }
}
