const { translate } = require("free-translate")
const { langs } = require("../utils/langs.util")

module.exports = async ({ lang, value }) => translate(value, { to: lang })
