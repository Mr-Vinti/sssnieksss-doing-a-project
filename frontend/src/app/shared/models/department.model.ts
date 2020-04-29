import { SeriesModel } from "./series.model";

export class DepartmentModel {
    deptId: number;
    name: string;
    facId: number;
    seriesList: Array<SeriesModel>;
};