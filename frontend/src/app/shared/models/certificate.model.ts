import { StudentModel } from "./student.model";

export class CertificateModel {
  certId: number;
  student: StudentModel;
  purpose: string;
  status: boolean;
}
