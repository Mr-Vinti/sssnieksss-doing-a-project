import { StudentModel } from "./student.model";

export class GroupModel {
    grpId: number;
    name: string;
    srsId: number;
    studentsList: Array<StudentModel>;
};