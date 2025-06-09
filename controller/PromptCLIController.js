class PromptCLIController {
    constructor(recordFunctions, promptService, record, dotenv) {
        this.recordFunctions = recordFunctions;
        this.promptService = promptService;
        this.record = record;
        
        dotenv.config();
        this.twitter_URL = process.env.TWITTER_URL;
        this.kemono_URL = process.env.KEMONO_URL;
        this.pixiv_URL = process.env.PIXIV_URL;
        this.novelupdates_URL = process.env.NOVELUPDATE_URL;
    };

    async run() {
        const action = await this.promptService.selectAction();
        await this.recordFunctions.loadData();

        const actionMap = {
            create: () => this.create(),
            update: () => this.update(),
            delete: () => this.delete(),
            search: () => this.search(),
            view: () => this.view(),
            twitter: () => this.viewSite(this.twitter_URL),
            kemono: () => this.viewSite(this.kemono_URL),
            pixiv: () => this.viewSite(this.pixiv_URL),
            novelupdates: () => this.viewSite(this.novelupdates_URL),
            exit: () => this.exit(),
        };

        await actionMap[action]();
    };

    exit() {
        console.log('Exiting...');
        process.exit(0);
    };

    async create() {
        const newData = await this.promptService.getUserInput();

        if (!(await this._recordExists(newData))) return;

        const newRecord = new this.record(newData);
        await this.recordFunctions.createNewData(newRecord);

        console.log(`Created the record.`);
    };

    async update() {
        const testUpdateId = await this.promptService.selectRecordId();
        const testRecord = await this.promptService.getSelectedRecord(testUpdateId);

        //console.log('Record being passed: ', testRecord);
        const updatedData = await this.promptService.getUserInput(testRecord);

        //console.log("updateData: ", updatedData);

        if (!(await this._recordExists(updatedData))) return;

        const newUpdatedRecord = new this.record(updatedData);
        await this.recordFunctions.updateData(testUpdateId, newUpdatedRecord);

        console.log(`Updated data for the current record.`);
    };

    async delete() {
        const testDeleteId = await this.promptService.selectRecordId();
        await this.recordFunctions.deleteData(testDeleteId);

        console.log(`Deleted data for the current record.`);
    };

    async search() {
        await this.promptService.searchRecords();
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

    async _recordExists(newData) {
        const { records } = await this.recordFunctions.getData();

        const recordExists = records.some(record => {
            //console.log('record.id: ', record.id);
            //console.log('newData.id: ', newData.id);
            if (record.id === newData.id) {
                return false;
            };

            return record.url === newData.url || record.url.startsWith(newData.url)
        });

        if (recordExists) {
            console.error(`Record with similar URL already exists: ${newData.url}`);
            return false;
        };

        return true;
    };
};

export default PromptCLIController;