"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatFileDb = void 0;
const fs = require("fs");
const promises_1 = require("fs/promises");
class FlatFileDb {
    constructor(filePath) {
        this.filePath = filePath;
    }
    getFilePath() {
        return this.filePath;
    }
    async checkFileExists(path) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, '');
        }
        return true;
    }
    async save(data) {
        await (0, promises_1.writeFile)(this.filePath, JSON.stringify(data));
    }
    async getAllRecords() {
        return (0, promises_1.readFile)(this.filePath)
            .then((records) => JSON.parse(records.toString()));
    }
    async getRecordById(id) {
        const record = (await this.getAllRecords()).find((record) => record.id === id);
        if (!record)
            throw new Error(`Record with id ${id} not found`);
        return record;
    }
    async createRecord(record) {
        const records = await this.getAllRecords();
        const id = records.length.toString() + 1;
        record.id = id;
        records.push(record);
        await this.save(records);
        return record;
    }
    async updateRecord(id, record) {
        const records = await this.getAllRecords();
        const recordIndex = records.findIndex((record) => record.id === id);
        if (recordIndex === -1) {
            throw new Error(`Record with id ${id} not found`);
        }
        records[recordIndex] = record;
        await this.save(records);
        return record;
    }
    async deleteRecord(id) {
        const records = await this.getAllRecords();
        const record = records.find((record) => record.id === id);
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        records.splice(records.indexOf(record), 1);
        await this.save(records);
    }
}
exports.FlatFileDb = FlatFileDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1maWxlLWRiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZsYXQtZmlsZS1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFDekIsMENBQWtEO0FBSWxELE1BQWEsVUFBVTtJQUduQixZQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFHRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVk7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFFLElBQXNCO1FBQ2hDLE1BQU0sSUFBQSxvQkFBUyxFQUNiLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDckIsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYTtRQUNqQixPQUFPLElBQUEsbUJBQVEsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzlCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQWdCLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBSSxFQUFVO1FBQy9CLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFLLENBQUMsQ0FBQyxJQUFJLENBQ2pELENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FDN0IsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMvRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBSSxNQUFpQjtRQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFJLEVBQVUsRUFBRSxNQUFpQjtRQUNqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFVO1FBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQXBFSCxnQ0FvRUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyB3cml0ZUZpbGUsIHJlYWRGaWxlIH0gZnJvbSAnZnMvcHJvbWlzZXMnO1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBGbGF0RmlsZURiIHtcbiAgICBwdWJsaWMgZmlsZVBhdGg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuZmlsZVBhdGggPSBmaWxlUGF0aDtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgZ2V0RmlsZVBhdGgoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbGVQYXRoO1xuICAgIH1cbiAgXG4gICAgYXN5bmMgY2hlY2tGaWxlRXhpc3RzKHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aCwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICBcbiAgICBhc3luYyBzYXZlKCBkYXRhOiBSZWNvcmQ8T2JqZWN0PltdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICBhd2FpdCB3cml0ZUZpbGUoXG4gICAgICAgIHRoaXMuZmlsZVBhdGgsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgKTtcbiAgICB9XG4gIFxuICAgIGFzeW5jIGdldEFsbFJlY29yZHM8VD4oKTogUHJvbWlzZTxSZWNvcmQ8VD5bXT4ge1xuICAgICAgcmV0dXJuIHJlYWRGaWxlKHRoaXMuZmlsZVBhdGgpXG4gICAgIC50aGVuKChyZWNvcmRzKTogUmVjb3JkPFQ+W10gPT4gSlNPTi5wYXJzZShyZWNvcmRzLnRvU3RyaW5nKCkpIGFzIFJlY29yZDxUPltdKTtcbiAgICB9XG4gIFxuICAgIGFzeW5jIGdldFJlY29yZEJ5SWQ8VD4oaWQ6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkPFQ+PiB7XG4gICAgICBjb25zdCByZWNvcmQgPSAoYXdhaXQgdGhpcy5nZXRBbGxSZWNvcmRzPFQ+KCkpLmZpbmQoXG4gICAgICAgIChyZWNvcmQpID0+IHJlY29yZC5pZCA9PT0gaWRcbiAgICAgICk7XG4gICAgICBpZiAoIXJlY29yZCkgdGhyb3cgbmV3IEVycm9yKGBSZWNvcmQgd2l0aCBpZCAke2lkfSBub3QgZm91bmRgKTtcbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuICBcbiAgICBhc3luYyBjcmVhdGVSZWNvcmQ8VD4ocmVjb3JkOiBSZWNvcmQ8VD4pOiBQcm9taXNlPFJlY29yZDxUPj4ge1xuICAgICAgY29uc3QgcmVjb3JkcyA9IGF3YWl0IHRoaXMuZ2V0QWxsUmVjb3JkcygpO1xuICAgICAgY29uc3QgaWQgPSByZWNvcmRzLmxlbmd0aC50b1N0cmluZygpICsxO1xuICAgICAgcmVjb3JkLmlkID0gaWQ7XG4gICAgICAgIHJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlKHJlY29yZHMpO1xuICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG4gIFxuICAgIGFzeW5jIHVwZGF0ZVJlY29yZDxUPihpZDogc3RyaW5nLCByZWNvcmQ6IFJlY29yZDxUPik6IFByb21pc2U8UmVjb3JkPFQ+PiB7XG4gICAgICBjb25zdCByZWNvcmRzID0gYXdhaXQgdGhpcy5nZXRBbGxSZWNvcmRzKCk7XG4gICAgICBjb25zdCByZWNvcmRJbmRleCA9IHJlY29yZHMuZmluZEluZGV4KChyZWNvcmQpID0+IHJlY29yZC5pZCA9PT0gaWQpO1xuICAgICAgaWYgKHJlY29yZEluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlY29yZCB3aXRoIGlkICR7aWR9IG5vdCBmb3VuZGApO1xuICAgICAgfVxuICAgICAgcmVjb3Jkc1tyZWNvcmRJbmRleF0gPSByZWNvcmQ7XG4gICAgICBhd2FpdCB0aGlzLnNhdmUocmVjb3Jkcyk7XG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cbiAgXG4gICAgYXN5bmMgZGVsZXRlUmVjb3JkKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIGNvbnN0IHJlY29yZHMgPSBhd2FpdCB0aGlzLmdldEFsbFJlY29yZHMoKTtcbiAgICAgIGNvbnN0IHJlY29yZCA9IHJlY29yZHMuZmluZCgocmVjb3JkKSA9PiByZWNvcmQuaWQgPT09IGlkKTtcbiAgICAgIGlmICghcmVjb3JkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVjb3JkIHdpdGggaWQgJHtpZH0gbm90IGZvdW5kYCk7XG4gICAgICB9XG4gICAgICByZWNvcmRzLnNwbGljZShyZWNvcmRzLmluZGV4T2YocmVjb3JkKSwgMSk7XG4gICAgICBhd2FpdCB0aGlzLnNhdmUocmVjb3Jkcyk7XG4gICAgfVxuICB9XG4gICJdfQ==