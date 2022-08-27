const mongoose = require("mongoose")

let connection = null
function connect(URI) {
    mongoose.connect(URI, { useNewUrlParser: true, maxPoolSize: 5, useUnifiedTopology: true }, function (err, db) {
        console.log("Connected to the database")
        connection = db

        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    connect,
    getConnection: () => connection,
}
