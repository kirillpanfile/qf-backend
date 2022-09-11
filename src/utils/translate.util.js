const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

// const url = ({ from, to, value }) =>
//     `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${from}%7C${to}&q=${value}&mt=1&onlyprivate=0&de=a%40b.c`

const url = ({ from, to, value }) =>
    `https://api.mymemory.translated.net/get?q=${value}&langpair=${from}|${to}&key=${process.env.MY_MEMORY_API_KEY}`

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "translated-mymemory---translation-memory.p.rapidapi.com",
    },
}

module.exports = async ({ from, to, value }) => {
    if (from === to)
        return {
            lang: from,
            value,
        }
    const response = await fetch(url({ from, to, value }), options)
    const data = await response.json()
    return {
        lang: to,
        value: data.responseData.translatedText,
    }
}
