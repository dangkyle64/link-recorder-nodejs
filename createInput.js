import { input } from "@inquirer/prompts";

async function getUserInput(defaults = {}) {

    //console.log('defaults: ', defaults);

    const url_name = await input({ 
        message: 'Enter URL name:',
        default: defaults.url_name,
    });

    const url_desc = await input({ 
        message: 'Enter URL description:',
        default: defaults.url_desc
     });

    const url = await input({ 
        message: 'Enter the URL:',
        default: defaults.url,
    });

    const newData = {
        id: defaults.id,
        url_name, 
        url_desc, 
        url
    };

    return newData;
};

export { getUserInput };