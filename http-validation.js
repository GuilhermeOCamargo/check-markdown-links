import fetch from "node-fetch"

function handleError(err) {
    throw new Error(err.message)
}

async function checkStatus(listUrl) {
    try {
        const listResponseStatus = await Promise
        .all(listUrl
            .map(async url => {
            const resp = await fetch(url)
            return `${resp.status} - ${resp.statusText}`
        }))
        return listResponseStatus
    } catch (err) {
        handleError(err)
    }
}

export async function validateUrl(links) {
    const listUrl = getUrlList(links)
    const listStatus = await checkStatus(listUrl)

    const response = links
    .map((obj, idx) => ({
        ...obj, status:listStatus[idx]
    }))
    return response
}

function getUrlList(links) {
    return links.map(link => Object
        .values(link).join())
}