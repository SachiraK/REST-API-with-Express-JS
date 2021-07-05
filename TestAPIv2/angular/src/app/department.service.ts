import { IEmployee } from './employee.model';
import { IDepartment } from './department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private _url: string = "http://localhost:3000/api/department"
  constructor(private http: HttpClient) { }

  getDepartment():Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>(this._url)
  }

  getEmployeeForDepartment(id:any):Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(`${this._url}/${id}/employees`)
  }

  createDepartment(data:any) {
    return this.http.post(this._url, data);
  }

  findDepartmentByTitle(title:any) {
    return this.http.get(`${this._url}?title=${title}`);
  }

  deleteAllDepartments() {
    return this.http.delete(this._url);
  }

  deleteSingleDepartment(id:number) {
    return this.http.delete(`${this._url}/${id}`);
  }

  updateDepartment(id:number, data:any) {
    return this.http.put(`${this._url}/${id}`, data);
  }
}
