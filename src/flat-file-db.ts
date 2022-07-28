import * as fs from 'fs';
import { writeFile, readFile } from 'fs/promises';

import { Record } from './interface';

export class FlatFileDb {
    constructor(filePath: string) {
      this.filePath = filePath;
    }
    filePath = './db.json';
    dbMap = new Map<string, Record<Object>>();
    getFilePath(): string {
      return this.filePath;
    }
  
    async checkFileExists(path: string): Promise<boolean> {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
      return true;
    }
  
    async save(): Promise<void> {
      await writeFile(
        this.filePath,
        JSON.stringify(Object.fromEntries(this.dbMap))
      );
    }
  
    async getAllRecords<T>(): Promise<Record<T>[]> {
      const records = JSON.parse(
        await readFile(this.filePath, 'utf8')
      ) as Record<T>[];
      records.map((record) => {
        this.dbMap.set(record.id, record);
      });
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
      await this.getAllRecords();
      const id = this.dbMap.size.toString() +1;
      record.id = id;
      this.dbMap.set(id, record);
      await this.save();
      return record;
    }
  
    async updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>> {
      const records = await this.getAllRecords();
      const recordIndex = records.findIndex((record) => record.id === id);
      if (recordIndex === -1) {
        throw new Error(`Record with id ${id} not found`);
      }
      this.dbMap.set(id, record);
      await this.save();
      return record;
    }
  
    async deleteRecord(id: string): Promise<void> {
      const records = await this.getAllRecords();
      const record = records.find((record) => record.id === id);
      if (!record) {
        throw new Error(`Record with id ${id} not found`);
      }
      this.dbMap.delete(id);
      await this.save();
    }
  }