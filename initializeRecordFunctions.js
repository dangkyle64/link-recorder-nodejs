import fs from 'fs';

import RecordFunctions from "./RecordFunctions.js";

// initial setup with path, seperating to make it easier to potentially put into an .env file
const storagePath = './storage.json';

const recordFunctions = new RecordFunctions(fs, storagePath);

export { recordFunctions };