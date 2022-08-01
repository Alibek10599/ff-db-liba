import * as fs from 'fs';
import { readFile, writeFile } from 'fs/promises';

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
      if (!fs.existsSync(path)) {
        await fs.writeFile(path, '[]', (err) => {
            if (err) throw err;
        });
      } else {
        return true;
      }
    }
  
    async save<T>(data: Record<T>[]): Promise<void> {
      await writeFile(
        this.filePath,
        JSON.stringify(data)
      );
    }
  
    async getAllRecords<T>(): Promise<Record<T>[]> {
        const records = JSON.parse(
            await readFile(this.filePath, 'utf8')
          ) as Record<T>[];
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
      const records = await this.getAllRecords();
      const id: number = records.length + 1;
      record.id = id.toString();
        records.push(record);
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
  