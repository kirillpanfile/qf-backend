const corsOptions = {
    origin: "http://localhost:8080",
    // origin: "http://192.168.0.101:8080",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    accessControlAllowOrigin: "http://localhost:8080",
}
module.exports = corsOptions
