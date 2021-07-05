import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from './../department.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent implements OnInit {

  constructor(private _departmentServie: DepartmentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  delete() {
    this._departmentServie.deleteAllDepartments()
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(["../departments"],{relativeTo:this.route});
        },
        error => {
          console.log(error);
        });
  }
  
  goToViewDept(){
    this.router.navigate(["../departments"],{relativeTo:this.route})
  }

}
