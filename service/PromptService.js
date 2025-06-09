import { select, input } from "@inquirer/prompts";
import { getUserInput } from "../createInput.js";
import { recordFunctions } from "../initializeRecordFunctions.js";

class PromptService {
    async selectAction() {
        const action = await select({
            message: 'Which action do you want to do?',
            choices: [
                { name: 'Create a link record', value: 'create' },
                { name: 'Update a link record', value: 'update' },
                { name: 'Delete a link record', value: 'delete' },
                { name: 'View a specific link record', value: 'search' },
                { name: 'View all link records', value: 'view' },
                { name: 'View all Twitter/X records', value: 'twitter'},
                { name: 'View all Kemono records', value: 'kemono'},
                { name: 'View all Pixiv records', value: 'pixiv'},
                { name: 'View all Novelupdates records', value: 'novelupdates'},
                { name: 'Exit', value: 'exit' },
            ]
        });

        return action;
    };

    async searchRecords() {
        const searchTerm = await input({
            message: 'Enter search term: '
        });

        const { records } = await recordFunctions.getData();

        if (!this._isRecordsArray(records)) return;

        const filtered = records.filter(record =>
            record.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.url_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.details?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            console.log('No matching records found.');
        } else {
            console.log(`\nFound ${filtered.length} matching record(s):\n`);
            filtered.forEach(r => {
                console.log(`- ${r.url_name || 'N/A'} (${r.id}): ${r.url}`);
            });
        };
    };

    async selectRecordId() {
        const { records } = await recordFunctions.getData();

        if (!this._isRecordsArray(records)) process.exit(0);

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

    async getSelectedRecord(id) {
        const { records } = await recordFunctions.getData();

        if (!this._isRecordsArray(records)) process.exit(0);

        const selectedRecord = records.find(r => r.id === id);
        //console.log('Selected this record: ', selectedRecord);

        return selectedRecord;
    };

    async getUserInput(defaults = {}) {
        return await getUserInput(defaults);
    };

    _isRecordsArray(records) {
        if (!Array.isArray(records) || records.length === 0) {
            console.log('No records available.');
            return false;
        };

        return true;
    };
};

export default PromptService;