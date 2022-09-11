const mongoose = require("mongoose")

function connect(URI) {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to database")
    })
}

module.exports = {
    connect,
}
