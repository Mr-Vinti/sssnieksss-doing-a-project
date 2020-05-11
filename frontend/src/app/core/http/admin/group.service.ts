import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { GroupModel } from "../../../shared/models/group.model";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  constructor(private http: HttpClient) {}

  addGroup(group: GroupModel): Observable<GroupModel> {
    const url = environment.addGroup;

    return this.http.post<GroupModel>(url, group);
  }

  getGroups(srsId: number): Observable<Array<GroupModel>> {
    const url = environment.getGroups;

    return this.http.post<Array<GroupModel>>(url, srsId);
  }
}