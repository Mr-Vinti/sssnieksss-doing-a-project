import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ContractModel } from "../../../shared/models/contract.model";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private http: HttpClient) {}

  addContract(contr: ContractModel) {
    const url = environment.addContract;

    return this.http.post<any>(url, contr);
  }

  getContracts(stdId: number): Observable<Array<ContractModel>> {
    const url = environment.getContracts;

    return this.http.post<Array<ContractModel>>(url, stdId);
  }

  updateContract(contr: ContractModel) {
    const url = environment.updateContract;

    return this.http.post<any>(url, contr);
  }

  deleteContract(ctrId: number) {
    const url = environment.deleteContract;

    return this.http.post<any>(url, ctrId);
  }
}
