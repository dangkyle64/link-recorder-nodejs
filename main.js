import { recordFunctions } from "./initializeRecordFunctions.js";
import Record from "./Record.js";

const newData = {
    "url_name": "STRING",
    "url_desc": "STRING",
    "url": "URL",
};

const updatedData = {
    "url_name": "STRINGUPDATED",
    "url_desc": "STRINGUPDATED",
    "url": "URLUPDATED",
};

const newRecord = new Record(newData);
const newUpdatedRecord = new Record(updatedData);

await recordFunctions.loadData();
//await recordFunctions.createNewData(newRecord);

console.log('-----------------------');
const testUpdateId = 1748881367481;
await recordFunctions.updateData(testUpdateId, newUpdatedRecord);
//await recordFunctions.getData();

console.log('-----------------------');
const testDeleteId = 1748881410967;
await recordFunctions.deleteData(testDeleteId);
await recordFunctions.getData();