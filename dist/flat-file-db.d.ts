/// <reference types="node" />
import { Record } from './interface';
export declare class FlatFileDb {
    filePath: string;
    constructor(filePath: string);
    getFilePath(): string;
    checkFileExists(path: string): Promise<boolean>;
    save<T>(data: Record<T>[]): Promise<void>;
    getBufferStats(offset: number, position: number): Promise<{
        buffer: Buffer;
        bytesRead: number;
    }>;
    getAllRecords<T>(): Promise<Record<T>[]>;
    getRecordById<T>(id: string): Promise<Record<T>>;
    createRecord<T>(record: Record<T>): Promise<Record<T>>;
    updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>>;
    deleteRecord(id: string): Promise<string>;
}
//# sourceMappingURL=flat-file-db.d.ts.map