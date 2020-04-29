import { SeriesModel } from "./series.model";
import { FacultyModel } from "./faculty.model";

export class DepartmentModel {
    deptId: number;
    name: string;
    faculty: FacultyModel;
    seriesList: Array<SeriesModel>;
};