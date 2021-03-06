import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
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

  getDepartments(facId: number): Observable<Array<DepartmentModel>> {
    const url = environment.getDepartments;

    return this.http.post<Array<DepartmentModel>>(url, facId);
  }

  updateDepartment(department: DepartmentModel) {
    const url = environment.updateDepartment;

    return this.http.post<any>(url, department);
  }

  deleteFaculty(deptId: number) {
    const url = environment.deleteDepartment;

    return this.http.post<any>(url, deptId);
  }
}
