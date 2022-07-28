"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatFileDb = void 0;
const fs = require("fs");
const promises_1 = require("fs/promises");
class FlatFileDb {
    constructor(filePath) {
        this.filePath = './db.json';
        this.dbMap = new Map();
        this.filePath = filePath;
    }
    getFilePath() {
        return this.filePath;
    }
    checkFileExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
            return true;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, promises_1.writeFile)(this.filePath, JSON.stringify(Object.fromEntries(this.dbMap)));
        });
    }
    getAllRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const records = JSON.parse(yield (0, promises_1.readFile)(this.filePath, 'utf8'));
            records.map((record) => {
                this.dbMap.set(record.id, record);
            });
            return records;
        });
    }
    getRecordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = (yield this.getAllRecords()).find((record) => record.id === id);
            if (!record)
                throw new Error(`Record with id ${id} not found`);
            return record;
        });
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAllRecords();
            const id = this.dbMap.size.toString() + 1;
            record.id = id;
            this.dbMap.set(id, record);
            yield this.save();
            return record;
        });
    }
    updateRecord(id, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getAllRecords();
            const recordIndex = records.findIndex((record) => record.id === id);
            if (recordIndex === -1) {
                throw new Error(`Record with id ${id} not found`);
            }
            this.dbMap.set(id, record);
            yield this.save();
            return record;
        });
    }
    deleteRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getAllRecords();
            const record = records.find((record) => record.id === id);
            if (!record) {
                throw new Error(`Record with id ${id} not found`);
            }
            this.dbMap.delete(id);
            yield this.save();
        });
    }
}
exports.FlatFileDb = FlatFileDb;
