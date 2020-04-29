import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Dialog } from '../../../shared/models/dialog.model';
import { FacultyModel } from '../../../shared/models/faculty.model';
import { SeriesModel } from '../../../shared/models/series.model';
import { SeriesService } from '../../../core/http/admin/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SeriesService,
    public dialog: MatDialog
  ) {}

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  private initializePage(): void {
    this.matForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")],
        [],
      ],
      stdyYr: [
        "",
        [Validators.required, Validators.pattern("^[1-9]*$")],
        [],
      ],
      
    });
  }

  ngOnInit(): void {
    this.initializePage();
  }

  selectOption(option: string): void {
    this.optionPicked = true;
    this.option = option;
  }

  addSeries(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let seriesModel : SeriesModel = new SeriesModel();

    seriesModel.name = this.matForm.controls.name.value;
    seriesModel.stdyYr = this.matForm.controls.stdyYr.value;

    this.service
      .addSeries(seriesModel)
      .subscribe((response) => {
        dialogRef.close();
        let series: SeriesModel = response;
        if (series.groupList == null) {
          this.openDialog(
            "Successfully created the new " +
              series.name +
              " series with id " +
              series.srsId +
              ".",
            false
          );
        } else {
          this.openDialog(
            "Series " +
              series.name +
              " already exists with id " +
              series.srsId +
              ".",
            false
          );
        }
      });
  }
}
