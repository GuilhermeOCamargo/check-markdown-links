import {getFile} from "./index.js"
import chalk from  'chalk'
import { validateUrl } from "./http-validation.js"

const params = process.argv

async function processText(params) {
    const result = await getFile(params[2])
    if (params[3] === 'validate') 
        console.log(chalk.yellow('VALIDATED LINKS:'), await validateUrl(result))
    else
        console.log(chalk.yellow('LINKS'), result)
}
processText(params)