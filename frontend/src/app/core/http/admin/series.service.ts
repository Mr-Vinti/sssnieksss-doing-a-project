import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { Observable } from "rxjs";
import { SeriesModel } from "../../../shared/models/series.model";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  constructor(private http: HttpClient) {}

  addSeries(series: SeriesModel): Observable<SeriesModel> {
    const url = environment.addSeries;

    return this.http.post<SeriesModel>(url, series);
  }

  getSeries(deptId: number): Observable<Array<SeriesModel>> {
    const url = environment.getSeries;

    return this.http.post<Array<SeriesModel>>(url, deptId);
  }

  updateSeries(series: SeriesModel) {
    const url = environment.updateSeries;

    return this.http.post<any>(url, series);
  }

  deleteSeries(srsId: number) {
    const url = environment.deleteSeries;

    return this.http.post<any>(url, srsId);
  }
}
