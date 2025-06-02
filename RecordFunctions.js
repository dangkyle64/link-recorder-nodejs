class RecordFunctions {
    constructor(fs, storagePath) {
        this.fs = fs;
        this.storagePath = storagePath;
        this.data = { records: [] };
    };

    async loadData() {
        try {
            if (!this.fs.existsSync(this.storagePath)) {
                this.data = { records: [] };
                const jsonString = JSON.stringify(this.data, null, 2);
                await this.fs.promises.writeFile(this.storagePath, jsonString, 'utf8');
            };

            const rawData = await this.fs.promises.readFile(this.storagePath, 'utf8');

            if (rawData.trim() === '') {
                this.data = { records: [] };
            } else {
                this.data = JSON.parse(rawData);
            };
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
        const jsonString = JSON.stringify(this.data, null, 2);
        await this.fs.promises.writeFile(this.storagePath, jsonString, 'utf8');
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
        const jsonString = JSON.stringify(this.data, null, 2);
        await this.fs.promises.writeFile(this.storagePath, jsonString, 'utf8');
    };

    _checkDataRecord() {
        if (!Array.isArray(this.data.records)) {
            console.error('No records loaded');
            return false;
        };
        return true;
    }
};

export default RecordFunctions;