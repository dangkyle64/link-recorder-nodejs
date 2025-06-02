class Record {
    constructor ({ url_name, url_desc, url }) {
        this.id = Date.now();
        this.url_name = url_name || '';
        this.url_desc = url_desc || '';
        this.url = url || '';
    };
};

export default Record;