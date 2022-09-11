const mongoose = require("mongoose")

function connect(URI) {
    mongoose.connect(URI, { useNewUrlParser: true, maxPoolSize: 5, useUnifiedTopology: true }, function (err, db) {
        console.log("Connected to the database")

        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    connect,
}
