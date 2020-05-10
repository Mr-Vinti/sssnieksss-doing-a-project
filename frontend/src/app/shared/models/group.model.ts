import { StudentModel } from "./student.model";
import { SeriesModel } from "./series.model";

export class GroupModel {
    grpId: number;
    name: string;
    series: SeriesModel;
    studentsList: Array<StudentModel>;
};