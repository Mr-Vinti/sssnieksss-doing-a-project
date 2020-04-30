import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { Observable } from "rxjs";
import { DepartmentModel } from "../../../shared/models/department.model";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  addDepartment(department: DepartmentModel): Observable<DepartmentModel> {
      const url = environment.addDepartment;

      return this.http.post<DepartmentModel>(url, department);
  }

  getDepartments(): Observable<Array<DepartmentModel>> {
      const url = environment.getDepartments;

      return this.http.post<Array<DepartmentModel>>(url, null);
  }
}
