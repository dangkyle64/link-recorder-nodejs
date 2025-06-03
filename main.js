import { recordFunctions } from "./initializeRecordFunctions.js";

import Record from "./Record.js";
import PromptService from "./service/promptService.js";
import PromptCLIController from "./controller/PromptCLIController.js";

const promptService = new PromptService();
const promptController = new PromptCLIController(recordFunctions, promptService, Record);

await promptController.run();


