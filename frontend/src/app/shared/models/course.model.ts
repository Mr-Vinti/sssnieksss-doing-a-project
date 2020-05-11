import { StudentModel } from "./student.model";
import { SeriesModel } from "./series.model";

export class CourseModel {
    crsId: number;
    name: string;
    creditPoints: number;
    teacher: string;
    semester: number;
    studyYear: number;
    series: SeriesModel;
};