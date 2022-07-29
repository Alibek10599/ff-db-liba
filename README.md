# ff-db-liba

This package enables you to work with your local database as a JSON file. Your local file would act as a database in order to prevent data loss during `npm` manipulations.

## Installation

First and foremost run following command to install

```
npm install ff-db-liba
```

## Sample Use Cases

```typescript
import { FlatFileDb } from 'ff-db-liba';

// give ralative path for your file
const inputPath = path.join(__dirname, '/data.json');

const flatfileDb = new FlatFileDb(inputPath);

const records = flatfileDb
  .getAllRecords()
  .then((records) => console.log('Retrieved records: ', records));
```

### Snippet above would log content of your local JSON database. Alternatively if it is needed to retrieve specific record run

```typescript
const id = '1';
const records = flatfileDb
  .getRecordById(id)
  .then((record) => console.log(`Retrieved record with id ${id}`, record));
```

### When initializing new database ypu should create a file with `.json` extension.

Make sure the content in your local `data.json` is initialized as follows

```
[]
```

### To create a record use `createRecord` method described below.

```typescript
import { Record } from 'ff-db-liba';

const data: Record<Object> = {
  id: '2',
  data: {
    id: '2',
    title: 'Some Title',
  },
  toJSON() {
    return this.data;
  },
};

const createRecord = flatfileDb
  .createRecord(data)
  .then((record) => console.log('New record created: ', record));
```

Afterwards your `data.json` would look like this:

```
[{"id":"2","title":"Some Title"}]
```

### In order to update your specific record you should pass id as a string as well as all data parameters for an updated record.

```typescript
const id = '4';
const updatedRecord = flatfileDb
  .updateRecord(id, data)
  .then((record) => console.log(`Updated record at id ${id}`, record));
```

### To delete specific record u should pass id parameter only

```typescript
const id = '3';
const deletedRecord = flatfileDb
  .deleteRecord(id)
  .then(() => console.log(`Deleted record with id ${id}`));
```
