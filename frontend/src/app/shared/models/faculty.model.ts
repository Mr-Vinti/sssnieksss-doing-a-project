import { DepartmentModel } from "./department.model";

export class FacultyModel {
    facId: number;
	name: string;
	departmentList: Array<DepartmentModel>;
};
