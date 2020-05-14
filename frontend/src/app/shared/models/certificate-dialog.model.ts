export class CertificateDialogModel {
  firstName: string;
  lastName: string;
  facultyName: string;
  departmentName: string;
  stdyYr: number;
  purpose: string;
}

export class CertificateDialogModelWrapper {
    public constructor(
        public model: CertificateDialogModel,
        public loading: boolean,
        public title?: string,
        public confirmNeeded?: boolean,
    ) {};
}
