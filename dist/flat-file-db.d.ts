import { Record } from './interface';
export declare class FlatFileDb {
    constructor(filePath: string);
    filePath: string;
    dbMap: Map<string, Record<Object>>;
    getFilePath(): string;
    checkFileExists(path: string): Promise<boolean>;
    save(): Promise<void>;
    getAllRecords<T>(): Promise<Record<T>[]>;
    getRecordById<T>(id: string): Promise<Record<T>>;
    createRecord<T>(record: Record<T>): Promise<Record<T>>;
    updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>>;
    deleteRecord(id: string): Promise<void>;
}
//# sourceMappingURL=flat-file-db.d.ts.map