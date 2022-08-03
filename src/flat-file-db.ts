import * as fs from 'fs';
import { readFile, writeFile, open } from 'fs/promises';
import { buffer } from 'stream/consumers';
import * as util from 'util';

import { Record } from './interface';

var SIZE = 64;

export class FlatFileDb {
    public filePath: string;

    constructor(filePath: string) {
      this.filePath = filePath;
    }
    
    getFilePath(): string {
      return this.filePath;
    }
  
    async checkFileExists(path: string): Promise<boolean> {
      if (!fs.existsSync(path)) {  // was used instead of fs.promises.access & fs.access to prevent race conditions
        await fs.writeFile(path, '[]', (err) => {
            if (err) throw err;
        });
      } else {
        return true;
      }
    }
  
    async save<T>(data: Record<T>[]): Promise<void> {
            let bytesRead: number = 0;
            let resultBuffer: Buffer = Buffer.alloc(0);
            for (const record of data) {
                let buffer = Buffer.from(JSON.stringify(record.id).padEnd(SIZE, '\0'));
                const {id, ...body} = record;
                buffer = Buffer.concat([buffer, Buffer.from(JSON.stringify(body)+ '\n')]);
                bytesRead += buffer.length;
                resultBuffer = Buffer.concat([resultBuffer, buffer], bytesRead);
            }
            await writeFile(this.filePath, resultBuffer);
      
    }

    async getBufferStats(offset: number, position: number): Promise<{ buffer: Buffer; bytesRead: number }> {
        const promisifiedRead = util.promisify(fs.read);
        const fileHandle = await open(this.filePath, 'r');
        const fd = await fileHandle.fd;
        const stat = await fileHandle.stat();
        const buffer = Buffer.alloc(stat.size);
        const { bytesRead } = await promisifiedRead(fd, buffer, offset, stat.size, position);
        return { buffer, bytesRead };
    }
  
    async getAllRecords<T>(): Promise<Record<T>[]> {
        const { buffer, bytesRead } = await this.getBufferStats(0, 0);
        const records: Record<T>[] = [];
        const data = buffer.toString('utf8', 0, bytesRead).split('\n');
        data.pop();
        for (const record of data) {
            if (record) {
                const body = record.substring(SIZE).trim();
                const id = record[1];
                records.push({id: id, ...JSON.parse(body)});
            }
        }
        return records;
    }
  
    async getRecordById<T>(id: string): Promise<Record<T>> {
      const record = (await this.getAllRecords<T>()).find(
        (record) => record.id === id
      );
      if (!record) throw new Error(`Record with id ${id} not found`);
      return record;
    }
  
    async createRecord<T>(record: Record<T>): Promise<Record<T>> {
        const {id, ...body} = record;
      const records = await this.getAllRecords();
      const recordId: number = records.length + 1;
      record.id = recordId.toString();
      records.push({ id: recordId.toString(), ...body });
      await this.save(records);
      return record;
    }
  
    async updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>> {
      const records = await this.getAllRecords();
      const recordIndex = records.findIndex((record) => record.id === id);
      if (recordIndex === -1) {
        throw new Error(`Record with id ${id} not found`);
      }
      records[recordIndex] = record;
      await this.save(records);
      return record;
    }
  
    async deleteRecord(id: string): Promise<string> {
      const records = await this.getAllRecords();
      const record = records.find((record) => record.id === id);
      if (!record) {
        throw new Error(`Record with id ${id} not found`);
      }
      records.splice(records.indexOf(record), 1);
      await this.save(records);
      return id;
    }
  }
  