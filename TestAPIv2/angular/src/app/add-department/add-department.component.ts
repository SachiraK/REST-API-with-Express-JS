import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { any } from 'sequelize/types/lib/operators';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department = {
    departmentName:"",
    published:false
  }
  submitted = false;

  constructor(private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  saveDepartment() {
    const data = {
      departmentName: this.department.departmentName,
    };

    this.departmentService.createDepartment(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newDepartment() {
    this.submitted = false;
    this.department = {
      departmentName: '',
      published:false
    };
  }
  test = window.location.href

  goToViewDept(){
    console.log(this.test)
    this.router.navigate(["../departments"],{relativeTo:this.route})
      .then(()=>{
        window.location.reload();
      })
  }
}
