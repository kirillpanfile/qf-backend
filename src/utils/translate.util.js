const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

// module.exports = async ({ lang, value }) => translate(value, { to: lang })

module.exports = async ({ from, to, value }) => {
    if (from === to)
        return {
            lang: from,
            value,
        }
    const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${value}&langpair=${from}|${to}&key=${process.env.MY_MEMORY_API_KEY}`
    )
    const data = await response.json()
    return {
        lang: to,
        value: data.responseData.translatedText,
    }
}
