import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { CourseModel } from "../../../shared/models/course.model";
import { CertificateModel } from "../../../shared/models/certificate.table";

@Injectable({
  providedIn: "root",
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getCertificates(): Observable<Array<CertificateModel>> {
    const url = environment.getCertificates;

    return this.http.post<Array<CertificateModel>>(url, null);
  }

  acceptCertificate(cert: CertificateModel) {
    const url = environment.acceptCertificate;

    return this.http.post<any>(url, cert);
  }

  rejectCertificate(cert: CertificateModel) {
    const url = environment.rejectCertificate;

    return this.http.post<any>(url, cert);
  }
}
