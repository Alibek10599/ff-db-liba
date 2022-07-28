interface Record<T> {
    id: string;
    data: T;
    toString(): string;
    toJSON(): T;
}
export default class FlatFileDb {
    constructor(filePath: string);
    filePath: string;
    dbMap: Map<any, any>;
    getFilePath(): string;
    checkFileExists(path: string): Promise<boolean>;
    getAllRecords<T>(): Promise<Record<T>[]>;
    getRecordById<T>(id: string): Promise<Record<T>>;
    createRecord<T>(record: Record<T>): Promise<Record<T>>;
    updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>>;
    deleteRecord<T>(id: string): Promise<Record<T>>;
}
export {};
