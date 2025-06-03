class JsonFileStorage {
    constructor(fs, storagePath) {
        this.fs = fs;
        this.storagePath = storagePath;
    };

    async exists() {
        return this.fs.existsSync( this.storagePath);
    };

    async read() {
        const data = await this.fs.promises.readFile(this.storagePath, 'utf8');
        const trimmed = data.trim();
        if (!trimmed) {
            return { records: [] };
        };
        return JSON.parse(trimmed);
    };

    async write(data) {
        const json = JSON.stringify(data, null, 2);
        await this.fs.promises.writeFile(this.storagePath, json, 'utf8');
    };
};

export default JsonFileStorage;