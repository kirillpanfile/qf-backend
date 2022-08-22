const corsOptions = {
    origin: "http://localhost:8080",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
}
module.exports = corsOptions
