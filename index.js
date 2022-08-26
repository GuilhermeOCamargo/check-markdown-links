import chalk from 'chalk'
import fs from 'fs'

function getLinks(data) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const linkList = []
    let link;
    while((link = regex.exec(data)) !== null) {
        linkList.push({ [link[1]]: [link[2]] })
    }
    return linkList.length ===0 ? 'file has no links' : linkList

}

function handleError(e) {
    throw new Error(chalk.red(e.code, 'Arquivo não existe'))
}

// async | await
export async function getFile(path) {
    try {
        const data = await fs.promises.readFile(path, 'utf-8')
        return getLinks(data)
    } catch (e) {
        handleError(e)
    }
}

// then | catch
// function getFile(path) {
//     fs.promises.readFile(path, 'utf-8')
//     .then(data => console.log(chalk.green(data)))
//     .catch((e) => handleError(e))
// }


// function getFile(path) {
//     fs.readFile(path, 'utf-8', (e, data) => {
//         if(e) {
//             handleError(e)
//         }
//         console.log(chalk.green(data))
//     })
// }

//  \[[^\]]*\]
//   \(https?:\/\/[^$#\s].[^\s]*\)

// getFile('./files/file1.md')

