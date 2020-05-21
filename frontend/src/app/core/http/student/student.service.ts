import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { StudentModel } from "../../../shared/models/student.model";
import { CourseModel } from "../../../shared/models/course.model";
import { ContractModel } from "../../../shared/models/contract.model";
import { CertificateModel } from "../../../shared/models/certificate.model";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getPersonalData(): Observable<StudentModel> {
    const url = environment.getPersonalData;

    return this.http.post<StudentModel>(url, null);
  }

  getCourses(): Observable<Array<CourseModel>> {
    const url = environment.getStudentCourses;

    return this.http.post<Array<CourseModel>>(url, null);
  }

  getContracts(): Observable<Array<ContractModel>> {
    const url = environment.getStudentContracts;

    return this.http.post<Array<ContractModel>>(url, null);
  }

  getCertificates(): Observable<Array<CertificateModel>> {
    const url = environment.getStudentCertificates;

    return this.http.post<Array<CertificateModel>>(url, null);
  }

  requestCertificate(purpose: String): Observable<CertificateModel> {
    const url = environment.requestCertificate;

    return this.http.post<CertificateModel>(url, purpose);
  }
}
