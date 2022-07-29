import * as fs from 'fs';
import { writeFile, readFile } from 'fs/promises';

import { Record } from './interface';

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
        fs.writeFileSync(path, '');
      }
      return true;
    }
  
    async save<T>(records: Record<T>[]): Promise<Record<T>[]> {
      return writeFile(
        this.filePath,
        JSON.stringify(records)
      ).then(() => records)
    }
  
    async getAllRecords<T>(): Promise<Record<T>[]> {
     return readFile(this.filePath)
     .then((body): Record<T>[] => JSON.parse(body.toString()) as Record<T>[]);
    }
  
    async getRecordById<T>(id: string): Promise<Record<T>> {
      return this.getAllRecords<T>().then((records) => records.find(
        (record) => record.id === id
      )).then((record) => {
        if (!record) throw new Error(`Record with id ${id} not found`);
        return record
      });
    }
  
    async createRecord<T>(record: Record<T>): Promise<Record<T>[]> {
     return this.getAllRecords<T>().then((records) => {
        record.id = (records.length + 1).toString();
        return [...records, record];
      }).then((newRecords) => this.save(newRecords));
    }
  
    async updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>[]> {
      return this.getAllRecords<T>().then((records) => {
        return records.map(r => {
          if(r.id == id){
            return record; 
          }
          return r;
        });
      })
      .then((newRecords) => this.save(newRecords))
    }
  
    async deleteRecord(id: string): Promise<void> {
      this.getAllRecords().then((records) => {
        return records.map(r => {
          if(r.id != id){ 
            return r;
          }
        });
      })
      .then((newRecords) => this.save(newRecords))
    }
  }