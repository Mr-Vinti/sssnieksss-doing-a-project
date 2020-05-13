import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { CourseModel } from "../../../shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private http: HttpClient) {}

  addCourse(stud: CourseModel): Observable<CourseModel> {
    const url = environment.addCourse;

    return this.http.post<CourseModel>(url, stud);
  }

  getCourses(srsId: number): Observable<Array<CourseModel>> {
    const url = environment.getCourses;

    return this.http.post<Array<CourseModel>>(url, srsId);
  }

  updateCourse(course: CourseModel) {
    const url = environment.updateCourse;

    return this.http.post<any>(url, course);
  }

  deleteCourse(crsId: number) {
    const url = environment.deleteCourse;

    return this.http.post<any>(url, crsId);
  }
}
