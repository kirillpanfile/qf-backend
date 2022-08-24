class validation {
    constructor() {
        this.langs = ["en", "ro", "ru"]
    }

    validator(item) {
        if (item.length == 0) return false
        return item.every((e) => this.langs.includes(e.lang))
    }

    lang(paths, schema) {
        //using self is easier than binding this
        // we would need to bind this 2 times
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
                console.log("value", value)
                return value.length > 0
            }, `${path} must not be empty`)
        })
    }
}

module.exports = new validation()
