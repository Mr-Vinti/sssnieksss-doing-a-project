import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { StudentModel } from "../../../shared/models/student.model";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpClient) {}

  addStudent(stud: StudentModel): Observable<StudentModel> {
    const url = environment.addStudent;

    return this.http.post<StudentModel>(url, stud);
  }

  getStudents(grpId: number): Observable<Array<StudentModel>> {
    const url = environment.getStudents;

    return this.http.post<Array<StudentModel>>(url, grpId);
  }

  updateStudent(student: StudentModel) {
    const url = environment.updateStudent;

    return this.http.post<any>(url, student);
  }

  deleteStudent(stdId: number) {
    const url = environment.deleteStudent;

    return this.http.post<any>(url, stdId);
  }
}
