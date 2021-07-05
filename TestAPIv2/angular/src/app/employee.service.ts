import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees(){
    return [
      {"id":1,"name":"BOSS"},
      {"id":2,"name":"Telco"},
      {"id":3,"name":"IoT"},
      {"id":4,"name":"Data"},
    ];
  }
}
