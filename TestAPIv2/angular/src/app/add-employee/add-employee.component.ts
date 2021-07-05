import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee = {
    employee_id: "",
    name: "",
    nic: "",
    department_id:""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
