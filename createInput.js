import { input } from "@inquirer/prompts";

async function getUserInput() {
    const url_name = await input({ message: 'Enter URL name:' });
    const url_desc = await input({ message: 'Enter URL description:' });
    const url = await input({ message: 'Enter the URL: '});

    const newData = {
        url_name, 
        url_desc, 
        url
    };

    return newData;
};

export { getUserInput };