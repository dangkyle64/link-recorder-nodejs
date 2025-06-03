import { getUserInput } from "./createInput.js";
import { recordFunctions } from "./initializeRecordFunctions.js";

import { select } from "@inquirer/prompts";

import Record from "./Record.js";

const action = await select({
    message: 'Which action do you want to do?',
    choices: [
        { name: 'Create a link record', value: 'create' },
        { name: 'Update a link record', value: 'update' },
        { name: 'Delete a link record', value: 'delete' },
        { name: 'View all link records', value: 'view' },
        { name: 'Exit', value: 'exit' },
    ]
});

await recordFunctions.loadData();

//view all records
async function viewLinkRecords() {
    const records = await recordFunctions.getData();
    console.log(records);
};

//select id 
async function selectId() {
    const { records } = await recordFunctions.getData();

    if (!Array.isArray(records) || records.length === 0) {
        console.log('No records available.');
        process.exit(0);
    };

    const selectedId = await select({
        message: 'Select a record to update/delete',
        choices: records.map(record => ({
            name: `${record.url_name} (${record.id})`,
            value: record.id
        })),
    });

    const selectedRecord = records.find(r => r.id === selectedId);
    console.log('Selected this record: ', selectedRecord);

    return selectedId;
};

//create 
async function createLinkRecord() {
    const newData = await getUserInput();
    const newRecord = new Record(newData);
    await recordFunctions.createNewData(newRecord);
};

//update 
async function updateLinkRecord() {
    const testUpdateId = await selectId();
    const updatedData = await getUserInput();
    const newUpdatedRecord = new Record(updatedData);
    await recordFunctions.updateData(testUpdateId, newUpdatedRecord);
};

//delete
async function deleteLinkRecord() {
    const testDeleteId = await selectId();
    await recordFunctions.deleteData(testDeleteId);
};

const actionMap = {
    create: createLinkRecord,
    update: updateLinkRecord,
    delete: deleteLinkRecord,
    view: viewLinkRecords,
    exit: () => process.exit(0)
};

await actionMap[action]();


