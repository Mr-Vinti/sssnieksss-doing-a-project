import { GroupModel } from "./group.model";

export class SeriesModel {
    srsId: number;
    name: string;
    stdyYr: number;
    deptId: number;
	groupList: Array<GroupModel>;
};