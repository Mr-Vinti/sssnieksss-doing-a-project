import { StudentModel } from "./student.model";

export class CertificateModel {
    certId: number;
    student: StudentModel;
    motivation: string;
    status: boolean;
  }
  