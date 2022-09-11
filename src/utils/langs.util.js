class validation {
    constructor() {
        this.langs = ["en", "ro", "ru"]
    }

    validator(item) {
        if (item.length == 0) return false
        return item.every((e) => this.langs.includes(e.lang))
    }

    lang(paths, schema) {
        const self = this
        paths.forEach(function (path) {
            schema.path(path).validate(function (lang) {
                return self.validator(lang)
            }, `${path} must be one of ${self.langs}`)
        })
    }

    empty(paths, schema) {
        paths.forEach(function (path) {
            schema.path(path).validate(function (value) {
                return value.length > 0
            }, `${path} must not be empty`)
        })
    }
}

module.exports = new validation()
