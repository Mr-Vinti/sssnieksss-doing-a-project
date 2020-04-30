import { GroupModel } from "./group.model";
import { DepartmentModel } from "./department.model";

export class SeriesModel {
    srsId: number;
    name: string;
    stdyYr: number;
    dept: DepartmentModel;
	groupList: Array<GroupModel>;
};