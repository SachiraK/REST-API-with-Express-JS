import { DepartmentService } from './../department.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { IDepartment } from '../department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  // styleUrls: ['../home/home.component.css'],
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit{
  public selectedID: any;
  departments?:IDepartment[];
  currentDepartment: IDepartment = {};
  currentIndex = -1;
  IsHiddenList = true;
  IsHiddenAdd = false;
  

  constructor(private _departmentServie: DepartmentService,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveDepartments(),
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = Number(params.get('id'));
      this.selectedID = id;
    })
    // this.goToViewDept()
  }
  
  retrieveDepartments(): void{
    this._departmentServie.getDepartment()
          .subscribe(res => {
            let response =JSON.parse(JSON.stringify(res));
            this.departments = response;
          })
  }

  onSelect(department:any){
    this.router.navigate([department.id],{relativeTo: this.route});
  }

  isSelected(department:any){
    return department.id === this.selectedID;
  }

  goToViewDept(){
    this.retrieveDepartments()
    this.router.navigate(["../departments"],{relativeTo:this.route})
    this.IsHiddenList = true;
    this.IsHiddenAdd = false;
  }

  goToAddDept(){
    this.router.navigate(["add-department"],{relativeTo:this.route})
    this.IsHiddenAdd = true;
    this.IsHiddenList = false;
  }

  goToDeleteDept(){
    this.router.navigate(["../delete-department"],{relativeTo:this.route})
  }

  refreshList() {
    this.retrieveDepartments();;
    this.currentIndex = -1;
  }

  setActiveDepartment(department:any, index:any) {
    this.currentDepartment = department;
    this.currentIndex = index;
  }

  removeAllDepartments() {
    this._departmentServie.deleteAllDepartments()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveDepartments();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this._departmentServie.findDepartmentByTitle(this.selectedID)
      .subscribe(
        res => {
          let response =JSON.parse(JSON.stringify(res));
          this.departments = response;
          console.log(res);
        },
        error => {
          console.log(error);
        });
  }

}