class PromptCLIController {
    constructor(recordFunctions, promptService, record, dotenv) {
        this.recordFunctions = recordFunctions;
        this.promptService = promptService;
        this.record = record;
        
        dotenv.config();
        this.twitter_URL = process.env.TWITTER_URL;
        this.kemono_URL = process.env.KEMONO_URL;
        this.pixiv_URL = process.env.PIXIV_URL;
    };

    async run() {
        const action = await this.promptService.selectAction();
        await this.recordFunctions.loadData();

        const actionMap = {
            create: () => this.create(),
            update: () => this.update(),
            delete: () => this.delete(),
            view: () => this.view(),
            twitter: () => this.viewSite(this.twitter_URL),
            kemono: () => this.viewSite(this.kemono_URL),
            pixiv: () => this.viewSite(this.pixiv_URL),
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

    async viewSite(search) {
        const { records } = await this.recordFunctions.getData();

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