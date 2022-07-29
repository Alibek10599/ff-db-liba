# This is sample NoSQL db wich stores records in flat file

This package enables you to work with your local database as a JSON file. Your local file would act as a database in order to prevent data loss during `npm` manipulations.

## Installation

First and foremost run following command to install

```
npm install ff-db-liba
```

## Sample Use Case

```typescript
import { FlatFileDb } from 'ff-db-liba';

// give ralative path for your file
const inputPath = path.join(__dirname, '/db.json');

const flatfileDb = new FlatFileDb(inputPath);

const records = flatfileDb
  .getAllRecords()
  .then((res) => console.log('res is', res));
```

Snippet above would log content of your local JSON database.
