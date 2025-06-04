class PromptCLIController {
    constructor(recordFunctions, promptService, record) {
        this.recordFunctions = recordFunctions;
        this.promptService = promptService;
        this.record = record;
    };

    async run() {
        const action = await this.promptService.selectAction();
        await this.recordFunctions.loadData();

        const actionMap = {
            create: () => this.create(),
            update: () => this.update(),
            delete: () => this.delete(),
            view: () => this.view(),
            twitter: () => this.twitter(),
            exit: () => process.exit(0)
        };

        await actionMap[action]();
    };

    async create() {
        const newData = await this.promptService.getUserInput();
        const newRecord = new this.record(newData);
        await this.recordFunctions.createNewData(newRecord);
    };

    async update() {
        const testUpdateId = await this.promptService.selectRecordId();
        const testRecord = await this.promptService.getSelectedRecord(testUpdateId);

        //console.log('Record being passed: ', testRecord);
        const updatedData = await this.promptService.getUserInput(testRecord);

        const newUpdatedRecord = new this.record(updatedData);
        await this.recordFunctions.updateData(testUpdateId, newUpdatedRecord);
    };

    async delete() {
        const testDeleteId = await this.promptService.selectRecordId();
        await this.recordFunctions.deleteData(testDeleteId);
    };

    async twitter() {
        const { records } = await this.recordFunctions.getData();
        const search = 'https://x.com/';

        //console.log('Records: ', records);

        const matching = records.filter(site => site.url.startsWith(search));
        console.log(matching);
    };

    async view() {
        const { records } = await this.recordFunctions.getData();
        console.log(records);
    };
};

export default PromptCLIController;