import { select } from "@inquirer/prompts";
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
                { name: 'View all link records', value: 'view' },
                { name: 'Exit', value: 'exit' },
            ]
        });

        return action;
    };

    async selectRecordId() {
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

    async getUserInput() {
        return await getUserInput();
    };
};

export default PromptService;