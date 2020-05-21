import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { StudentService } from "../../../core/http/student/student.service";
import { Dialog } from "../../../shared/models/dialog.model";
import { MatDialog } from "@angular/material/dialog";
import { StudentModel } from "../../../shared/models/student.model";
import { MatTableDataSource } from "@angular/material/table";
import { ContractModel } from "../../../shared/models/contract.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-contracts",
  templateUrl: "./contracts.component.html",
  styleUrls: ["./contracts.component.scss"],
})
export class ContractsComponent implements OnInit {
  displayedColumns: string[] = ["ctrId", "stdyType", "stdyYr", "year"];
  dataSource: MatTableDataSource<ContractModel>;
  contractList: Array<ContractModel> = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StudentService, private dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.dataSource = new MatTableDataSource();
    this.service.getContracts().subscribe((response) => {
      dialogRef.close();
      if (response.length == 0) {
        this.openDialog("No courses found", false);
      } else {
        this.contractList = response;
        this.dataSource.data = this.contractList;
      }
    });
  }

  ngOnInit(): void {
    this.initializeDatasource();
  }
}
