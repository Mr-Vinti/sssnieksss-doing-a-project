import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FacultyService {
  constructor(private http: HttpClient) {}

  addFaculty(name: string): Observable<FacultyModel> {
    const url = environment.addFaculty;

    return this.http.post<FacultyModel>(url, name);
  }

  getFaculties(): Observable<Array<FacultyModel>> {
    const url = environment.getFaculties;

    return this.http.post<Array<FacultyModel>>(url, null);
  }

  updateFaculty(faculty: FacultyModel) {
    const url = environment.updateFaculty;

    return this.http.post<any>(url, faculty);
  }

  deleteFaculty(facId: number) {
    const url = environment.deleteFaculty;

    return this.http.post<any>(url, facId);
  }
}
