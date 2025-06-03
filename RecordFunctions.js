class RecordFunctions {
    constructor(storage) {
        this.storage = storage;
        this.data = { records: [] };
    };

    async loadData() {
        try {
            if (!await this.storage.exists()) {
                await this.storage.write({ records: [] });
            };
            this.data = await this.storage.read();
        } catch(error) {
            console.error('Error loading data: ', error);
            this.data = { records: [] };
        };
    };

    async getData() {
        //console.log('Current Data:', this.data);
        return this.data;
    };

    async createNewData(newData) {
        if (!this._checkDataRecord()) this.data.records = [];

        this.data.records.push(newData);
        await this.saveFile();
    };

    async updateData(id, updatedData) {
        if (!this._checkDataRecord()) return;

        const index = this.data.records.findIndex(record => record.id === id);

        if (index === -1) {
            console.error('No record under that id has been found to update');
            return;
        };

        this.data.records[index] = {
            ...this.data.records[index],
            ...updatedData
        };

        await this.saveFile();
    };

    async deleteData(id) {
        if (!this._checkDataRecord()) return;

        const initialLength = this.data.records.length;
        this.data.records = this.data.records.filter(record => record.id !== id);

        if (this.data.records.length === initialLength) {
            console.error('No record under that id has been found to delete');
            return;
        };

        console.log('Deleted id: ', id);
        await this.saveFile();
    };

    async saveFile() {
        await this.storage.write(this.data);
    };

    _checkDataRecord() {
        if (!Array.isArray(this.data.records)) {
            console.error('No records loaded');
            return false;
        };
        return true;
    };
};

export default RecordFunctions;