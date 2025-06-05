class Record {
    constructor ({ id, url_name, url_desc, url }) {
        this.id = id || Date.now();
        this.url_name = url_name || '';
        this.url_desc = url_desc || '';
        this.url = url || '';
    };
};

export default Record;