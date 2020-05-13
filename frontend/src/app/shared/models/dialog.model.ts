export class Dialog {
    public constructor(
        public message: string,
        public loading: boolean,
        public title?: string,
        public confirmNeeded?: boolean,
    ) {};
}
