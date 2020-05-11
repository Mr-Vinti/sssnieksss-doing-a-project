import { ContractModel } from "./contract.model";
import { GroupModel } from "./group.model";


export class StudentModel {
    stdId: number;
    firstName: string;
    lastName: string;
    userName: string;
    fatherInitial: string;
    cnp: string;
    phoneNumber: string;
    email: string;
    group: GroupModel;
    studyYear: number;
	contractList: Array<ContractModel>;
};