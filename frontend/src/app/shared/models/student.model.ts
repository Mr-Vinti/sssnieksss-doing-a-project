import { ContractModel } from "./contract.model";


export class StudentModel {
    stdId: number;
    frstnam: string;
    lstnam: string;
    usrnam: string;
    fthrinit: string;
    cnp: string;
    phnnbr: string;
    email: string;
    grpId: number;
    stdyYr: number;
	contractsList: Array<ContractModel>;
};