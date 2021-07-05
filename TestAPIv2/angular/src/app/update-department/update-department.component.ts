import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from './../department.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  department = {
    departmentName:"",
    published:false
  }
  submitted = false;

  @Input("parentData2") public departmentID:any

  constructor(private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  update() {
    const data = {
      departmentName: this.department.departmentName,
    };

    this.departmentService.updateDepartment(this.departmentID,data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
