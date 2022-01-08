export interface Form{
    uuid: string;
    title: string;
    info: string;
    questions: Array<Questions>;
}

export interface Questions{
    uuid: string;
    title: string;
    questionType: string;
    options: Array<Options>;
}

export interface Options{
    uuid: string;
    option: string;
}