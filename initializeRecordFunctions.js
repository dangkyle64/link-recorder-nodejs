import fs from 'fs';

import RecordFunctions from "./RecordFunctions.js";
import JsonFileStorage from './JsonFileStorage.js';

// initial setup with path, seperating to make it easier to potentially put into an .env file
const storagePath = './storage.json';

const storage = new JsonFileStorage(fs, storagePath);
const recordFunctions = new RecordFunctions(storage);

export { recordFunctions };